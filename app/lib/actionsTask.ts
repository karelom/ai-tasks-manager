'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { ResponseState, Task } from '@/lib/definitions';
import { AddTaskErrors, AddTaskSchema, AddTaskType } from '@/lib/schemas';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function fetchTasks(isDeleted = false): ResponseState<Task[]> {
  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks 
      WHERE (deleted_at IS NOT NULL) = ${isDeleted}
      ORDER BY created_at DESC
    `;

    return { ok: true, data };
  } catch (err) {
    console.error('Failed to fetch all tasks:', err);
    return { ok: false, error: 'Database Error: Failed to fetch all task data.' };
  }
}

export async function fetchActiveProjectTasks(projectId: string): ResponseState<Task[]> {
  if (!projectId) return { ok: false, error: 'No project id provided.' };

  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE project_id = ${projectId} AND deleted_at IS NULL
      ORDER BY order_idx ASC
    `;

    return { ok: true, data };
  } catch (err) {
    console.error('Failed to fetch specific project tasks:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to fetch tasks data from specific project.',
    };
  }
}

export async function fetchActiveTask(taskId: string): ResponseState<Task> {
  if (!taskId) return { ok: false, error: 'No task id provided.' };

  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE id = ${taskId} AND deleted_at IS NULL
      LIMIT 1
    `;

    return { ok: true, data: data[0] ?? null };
  } catch (err) {
    console.error('Failed to fetch task:', err);
    return { ok: false, error: 'Database Error: Failed to fetch specific task data.' };
  }
}

export async function createTasks(
  payload: AddTaskType[],
  trxSql = sql
): ResponseState<Task[] | AddTaskErrors> {
  const validAddTasks: Partial<Task>[] = [];

  for (const data of payload) {
    const validatedFields = AddTaskSchema.safeParse(data);
    if (!validatedFields.success) {
      return {
        ok: false,
        data: z.treeifyError(validatedFields.error).properties,
        error: 'Validation Fail: Task validation failed.',
      };
    }
    validAddTasks.push(validatedFields.data);
  }

  const runner = async (trx: unknown) => {
    const trxSql = trx as postgres.Sql;

    await setProjectOrderIdx(validAddTasks, trxSql);

    return await trxSql<Task[]>`
      INSERT INTO tasks ${trxSql(validAddTasks)}
      ON CONFLICT (id) DO NOTHING
      RETURNING *
    `;
  };

  try {
    const data =
      typeof trxSql.begin === 'function' ? await sql.begin(runner) : await runner(trxSql);

    revalidatePath('/all-task');
    validAddTasks.forEach((task) => {
      if (task.projectId) {
        revalidatePath(`/project/${task.projectId}`);
      }
    });
    return { ok: true, data };
  } catch (err) {
    console.error('Failed to create task:', err);
    return { ok: false, error: 'Database Error: Failed to Create Task.' };
  }

  async function setProjectOrderIdx(payload: Partial<Task>[], trxSql = sql) {
    const projectIds = [
      ...new Set(payload.filter((data) => data.projectId !== null).map((data) => data.projectId!)),
    ];

    // lock projects to avoid race
    await trxSql`
      SELECT id FROM projects
      WHERE id = ANY(${projectIds})
      FOR UPDATE
    `;

    // get max order per project
    const result = await trxSql<{ projectId: string; max: number }[]>`
      SELECT project_id, COALESCE(MAX(order_idx), -1) AS max
      FROM tasks
      WHERE project_id = ANY(${projectIds})
      GROUP BY project_id
    `;
    const projectOrderIdxMap = new Map<string, number>();
    result.forEach((data) => {
      projectOrderIdxMap.set(data.projectId, data.max);
    });

    // update orderIdx by project
    payload.forEach((data) => {
      if (!data.projectId) return;

      const currentIdx = (projectOrderIdxMap.get(data.projectId) ?? -1) + 1;
      projectOrderIdxMap.set(data.projectId, currentIdx);
      data.orderIdx = currentIdx;
    });
  }
}

export async function updateTask(taskId: string, updates: Partial<AddTaskType>): ResponseState {
  const keys = Object.keys(updates) as (keyof AddTaskType)[];
  if (!keys.length) return { ok: true };

  try {
    await sql`
      UPDATE tasks 
      SET ${sql(updates)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${taskId}
    `;

    revalidatePath('/all-task');
    revalidatePath(`/task/${taskId}`);
    // TODO: revalidatePath /project/[id]

    return { ok: true };
  } catch (err) {
    console.error('Failed to update task:', err);
    return { ok: false, error: 'Database Error: Failed to Update Task.' };
  }
}

export async function deleteTask(taskId: string): ResponseState {
  try {
    await sql`
      UPDATE tasks 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ${taskId}
    `;

    revalidatePath('/all-task');
    revalidatePath(`/task/${taskId}`);
    // TODO: revalidatePath /project/[id]

    return { ok: true };
  } catch (err) {
    console.error('Failed to soft-delete task:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to Archive Task.',
    };
  }
}

export async function deleteProjectTasks(projectId: string, trxSql = sql): ResponseState {
  try {
    await trxSql`
      UPDATE tasks 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE project_id = ${projectId}
    `;

    revalidatePath('/all-task');

    return { ok: true };
  } catch (err) {
    console.error('Failed to soft-delete project tasks:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to Archive Project Tasks.',
    };
  }
}

export async function restoreTask(taskId: string): ResponseState {
  try {
    await sql`UPDATE tasks SET deleted_at = NULL WHERE id = ${taskId}`;

    revalidatePath('/all-task');
    revalidatePath(`/task/${taskId}`);
    // TODO: revalidatePath /project/[id]

    return { ok: true };
  } catch (err) {
    console.error('Failed to restore task:', err);
    return { ok: false, error: 'Database Error: Failed to restore task.' };
  }
}

// TODO: will restore all deleted tasks (undo for specific tasks only?)
export async function restoreProjectTasks(projectId: string, trxSql = sql): ResponseState {
  try {
    await trxSql`UPDATE tasks SET deleted_at = NULL WHERE project_id = ${projectId}`;

    revalidatePath('/all-task');

    return { ok: true };
  } catch (err) {
    console.error('Failed to restore project task:', err);
    return { ok: false, error: 'Database Error: Failed to restore project tasks.' };
  }
}

export async function swapTaskOrder(
  projectId: string,
  updateMap: Map<string, number>
): ResponseState {
  try {
    await sql.begin(async (trx: unknown) => {
      const trxSql = trx as postgres.Sql;

      const updateList: [string, number][] = [];
      const idList: string[] = [];
      updateMap.forEach((idx, id) => {
        updateList.push([id, idx]);
        idList.push(id);
      });

      // temporary shift to avoid UNIQUE conflicts
      await trxSql`
        UPDATE tasks
        SET order_idx = order_idx + 1000000
        WHERE project_id = ${projectId}
          AND id IN ${trxSql(idList)}
      `;

      // final update
      await trxSql`
        UPDATE tasks
        SET
          order_idx = (update_data.order_idx)::int,
          updated_at = CURRENT_TIMESTAMP
        FROM (
          VALUES ${trxSql(updateList)}
        ) as update_data (id, order_idx)
        WHERE project_id = ${projectId}
          AND tasks.id = (update_data.id)::uuid
      `;
    });

    revalidatePath(`/project/${projectId}`);

    return { ok: true };
  } catch (err) {
    console.error('Failed to swap tasks:', err);
    return { ok: false, error: 'Database Error: Failed to Swap Tasks.' };
  }
}
