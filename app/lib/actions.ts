'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { AddTaskSchema, AddTaskType } from '@/lib/schemas';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

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
    console.error(err);
    return { ok: false, message: 'Database Error: Failed to Create Task.' };
  }

  revalidatePath('/all-task');
  return { ok: true };
}
