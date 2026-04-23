'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { ResponseState, Task } from '@/lib/definitions';
import { AddTaskSchema, AddTaskType } from '@/lib/schemas';

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

export async function fetchActiveTask(taskId: string): ResponseState<Task> {
  if (!taskId) return { ok: false, error: 'No id provided.' };

  try {
    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE id = ${taskId} AND deleted_at IS NULL
    `;

    return { ok: true, data: data[0] ?? null };
  } catch (err) {
    console.error('Failed to fetch task:', err);
    return { ok: false, error: 'Database Error: Failed to fetch specific task data.' };
  }
}

export async function createTask(payload: AddTaskType): ResponseState {
  const validatedFields = AddTaskSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      ok: false,
      data: z.treeifyError(validatedFields.error!).properties,
      error: 'Validation Fail: Task validation failed.',
    };
  }

  const { projectId, parentId, title, description, status, priority, dueAt } = validatedFields.data;
  try {
    await sql`
      INSERT INTO tasks (project_id, parent_id, title, description, status, priority, due_at)
      VALUES (${projectId}, ${parentId}, ${title}, ${description}, ${status}, ${priority}, ${dueAt})
    `;
  } catch (err) {
    console.error('Failed to create task:', err);
    return { ok: false, error: 'Database Error: Failed to Create Task.' };
  }

  revalidatePath('/all-task');
  return { ok: true };
}

export async function updateTask(id: string, updates: Partial<AddTaskType>): ResponseState {
  const keys = Object.keys(updates) as (keyof AddTaskType)[];
  if (!keys.length) return { ok: true };

  try {
    await sql`
      UPDATE tasks 
      SET ${sql(updates)} 
      WHERE id = ${id}
    `;

    revalidatePath('/all-task');
    revalidatePath(`/task/${id}`);
    return { ok: true };
  } catch (err) {
    console.error('Failed to update task:', err);
    return { ok: false, error: 'Database Error: Failed to Update Task.' };
  }
}

export async function deleteTask(id: string): ResponseState {
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

export async function restoreTask(id: string): ResponseState {
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
