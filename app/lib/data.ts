import postgres from 'postgres';
import { Task } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
