'use server';

import postgres from 'postgres';
import { Project, TaskPlanGroup, TaskPlanVariant, TaskPlanVariantDTO } from '@/lib/definitions';
import { buildWhereConditions } from '@/lib/utils';
import { createProject } from '@/lib/actionsProject';
import { AddProjectType, AddTaskType } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { createTask } from '@/lib/actionsTask';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function fetchTaskPlanGroupFirstMatch({
  normalizedInput,
}: {
  normalizedInput: string;
}) {
  try {
    const data = await sql<TaskPlanGroup[]>`
      SELECT * FROM task_plan_groups
      WHERE normalized_input = ${normalizedInput}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    return { ok: true, data: data[0] };
  } catch (err) {
    console.error('Database Error:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to fetch first matched data from task_plan_groups',
    };
  }
}

export async function createTaskPlanGroup({ normalizedInput }: { normalizedInput: string }) {
  try {
    const data = await sql<TaskPlanGroup[]>`
      INSERT INTO task_plan_groups (normalized_input)
      VALUES (${normalizedInput})
      RETURNING *
    `;
    return { ok: true, data: data[0] };
  } catch (err) {
    console.error('Database Error:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to create task_plan_groups',
    };
  }
}

export async function fetchTaskPlanVariantFirstMatch(payload: Partial<TaskPlanVariant>) {
  try {
    const data = await sql<TaskPlanVariantDTO[]>`
      SELECT * FROM task_plan_variants
      WHERE ${buildWhereConditions(sql, payload)}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    return { ok: true, data: data[0] };
  } catch (err) {
    console.error('Database Error:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to fetch first matched data from task_plan_groups',
    };
  }
}

export async function createTaskPlanVariant(payload: Partial<TaskPlanVariantDTO>) {
  try {
    const data = await sql<TaskPlanVariantDTO[]>`
      INSERT INTO task_plan_variants ${sql(payload)}
      RETURNING *
    `;
    return { ok: true, data: data[0] };
  } catch (err) {
    console.error('Database Error:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to create task_plan_variants',
    };
  }
}

export async function createProjectWithTasks(
  projectPayload: AddProjectType,
  tasksPayload: AddTaskType[]
) {
  try {
    const result = await sql.begin(async (trx: unknown) => {
      const localSql = trx as postgres.Sql;
      const projectResult = await createProject(projectPayload, localSql);
      const tasksResult = await Promise.all(
        tasksPayload.map(async (task) => {
          const taskResult = await createTask(
            { ...task, projectId: (projectResult.data as Project).id },
            localSql
          );
          if (taskResult.ok) return taskResult.data;
          throw new Error('could not create task', { cause: taskResult.error });
        })
      );
      return { project: projectResult.data, tasks: tasksResult };
    });

    revalidatePath('/all-project');
    revalidatePath('/all-task');
    return {
      ok: true,
      data: result,
    };
  } catch (err) {
    console.error('Database Error - ', err);
    return {
      ok: false,
      error: 'Database Error: Failed to create project or corresponding tasks',
    };
  }
}
