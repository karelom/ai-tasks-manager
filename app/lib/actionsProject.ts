'use server';

import postgres from 'postgres';
import { Project, ResponseState } from '@/lib/definitions';
import { AddProjectErrors, AddProjectSchema, AddProjectType } from '@/lib/schemas';
import z from 'zod';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function fetchProjects(isDeleted = false): ResponseState<Project[]> {
  try {
    const data = await sql<Project[]>`
      SELECT * FROM projects 
      WHERE (deleted_at IS NOT NULL) = ${isDeleted}
      ORDER BY created_at DESC
    `;

    return { ok: true, data };
  } catch (err) {
    console.error('Failed to fetch all projects:', err);
    return { ok: false, error: 'Database Error: Failed to fetch all project data.' };
  }
}

export async function fetchActiveProject(projectId: string): ResponseState<Project> {
  if (!projectId) return { ok: false, error: 'No project id provided.' };

  try {
    const data = await sql<Project[]>`
      SELECT * FROM projects
      WHERE id = ${projectId} AND deleted_at IS NULL
      LIMIT 1
    `;

    return { ok: true, data: data[0] ?? null };
  } catch (err) {
    console.error('Failed to fetch project:', err);
    return { ok: false, error: 'Database Error: Failed to fetch specific project data.' };
  }
}

export async function createProjects(
  payload: AddProjectType[],
  trxSql = sql
): ResponseState<Project[] | AddProjectErrors> {
  const validAddProjects: AddProjectType[] = [];

  for (const data of payload) {
    const validatedFields = AddProjectSchema.safeParse(data);
    if (!validatedFields.success) {
      return {
        ok: false,
        data: z.treeifyError(validatedFields.error).properties,
        error: 'Validation Fail: Project validation failed.',
      };
    }
    validAddProjects.push(validatedFields.data);
  }

  try {
    const data = await trxSql<Project[]>`
      INSERT INTO projects ${trxSql(validAddProjects)}
      ON CONFLICT (id) DO NOTHING
      RETURNING *
    `;

    revalidatePath('/all-project');
    return { ok: true, data };
  } catch (err) {
    console.error('Failed to create project:', err);
    return { ok: false, error: 'Database Error: Failed to Create Project.' };
  }
}
