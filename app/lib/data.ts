import postgres from 'postgres';
import { Task } from './definitions';

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
