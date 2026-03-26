'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { TaskPriority, TaskStatus } from './definitions';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

const AddTaskSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  projectId: z.string().nullable(),
  parentId: z.string().nullable(),
  description: z.string().optional(),
  status: z.enum(TaskStatus).default(TaskStatus.BACKLOG),
  priority: z.enum(TaskPriority).default(TaskPriority.NONE),
  dueAt: z.date().nullable(),
});
export type AddTask = z.infer<typeof AddTaskSchema>;

export async function createTask(formData: FormData) {
  const validatedFields = AddTaskSchema.safeParse({
    title: formData.get('title'),
    projectId: formData.get('projectId') || null,
  });

  if (!validatedFields.success) {
    return { ok: false, errors: validatedFields.error.flatten().fieldErrors };
  }

  const { title, projectId } = validatedFields.data;

  try {
    await sql`
      INSERT INTO tasks (title, project_id, status)
      VALUES (${title}, ${projectId}, 'backlog')
    `;
  } catch (error) {
    return { ok: false, message: 'Database Error: Failed to Create Task.', error };
  }

  revalidatePath('/all-task');
  return { ok: true };
}
