'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Task } from '@/lib/definitions';
import { AddTaskSchema, AddTaskType } from '@/lib/schemas';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function fetchTasks(isDeleted = false) {
  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks 
      WHERE (deleted_at IS NOT NULL) = ${isDeleted}
      ORDER BY created_at DESC
    `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch tasks data.');
  }
}

export async function fetchActiveTask(taskId: string) {
  if (!taskId) return;

  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE id = ${taskId} AND deleted_at IS NULL
    `;

    return data[0] ?? null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch specific task data.');
  }
}

export async function createTask(payload: AddTaskType) {
  const validatedFields = AddTaskSchema.safeParse(payload);

  if (!validatedFields.success) {
    return { ok: false, errors: z.treeifyError(validatedFields.error!).properties };
  }

  const { projectId, parentId, title, description, status, priority, dueAt } = validatedFields.data;
  try {
    await sql`
      INSERT INTO tasks (project_id, parent_id, title, description, status, priority, due_at)
      VALUES (${projectId}, ${parentId}, ${title}, ${description}, ${status}, ${priority}, ${dueAt})
    `;
  } catch (err) {
    console.error('Failed to create task:', err);
    return { ok: false, message: 'Database Error: Failed to Create Task.' };
  }

  revalidatePath('/all-task');
  return { ok: true };
}

export interface ResponseState {
  ok: boolean;
  error?: string;
}

export async function updateTask(
  id: string,
  updates: Partial<AddTaskType>
): Promise<ResponseState> {
  const keys = Object.keys(updates) as (keyof AddTaskType)[];
  if (!keys.length) return { ok: true };

  try {
    await sql`
      UPDATE tasks 
      SET ${sql(updates)} 
      WHERE id = ${id}
    `;

    revalidatePath(`/task/${id}`);
    return { ok: true };
  } catch (err) {
    console.error('Failed to update task:', err);
    return { ok: false, error: 'Database Error: Failed to Update Task.' };
  }
}

export async function deleteTask(id: string): Promise<ResponseState> {
  try {
    await sql`
      UPDATE tasks 
      SET deleted_at = NOW() 
      WHERE id = ${id}
    `;

    revalidatePath('/all-task');
    revalidatePath(`/task/${id}`);

    return { ok: true };
  } catch (err) {
    console.error('Failed to soft-delete task:', err);
    return {
      ok: false,
      error: 'Database Error: Failed to Archive Task.',
    };
  }
}

export async function restoreTask(id: string): Promise<ResponseState> {
  try {
    await sql`UPDATE tasks SET deleted_at = NULL WHERE id = ${id}`;

    revalidatePath('/all-task');
    revalidatePath(`/task/${id}`);

    return { ok: true };
  } catch (err) {
    console.error('Failed to restore task:', err);
    return { ok: false, error: 'Database Error: Failed to restore task.' };
  }
}
