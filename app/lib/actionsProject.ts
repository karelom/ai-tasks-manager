'use server';

import postgres from 'postgres';
import { Project, ResponseState } from '@/lib/definitions';

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

export async function fetchActiveProject(id: string): ResponseState<Project> {
  if (!id) return { ok: false, error: 'No id provided.' };

  try {
    const data = await sql<Project[]>`
      SELECT * FROM projects
      WHERE id = ${id} AND deleted_at IS NULL
    `;

    return { ok: true, data: data[0] ?? null };
  } catch (err) {
    console.error('Failed to fetch project:', err);
    return { ok: false, error: 'Database Error: Failed to fetch specific project data.' };
  }
}
