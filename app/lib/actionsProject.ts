'use server';

import postgres from 'postgres';
import { Project } from '@/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function fetchProjects(isDeleted = false) {
  try {
    const data = await sql<Project[]>`
      SELECT * FROM projects 
      WHERE (deleted_at IS NOT NULL) = ${isDeleted}
      ORDER BY created_at DESC
    `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch tasks data.');
  }
}
