import postgres from 'postgres';
import { tasks } from './placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    await sql.begin(() => {
      seedTasks();
    });
    return Response.json({ message: 'Database seeded successfully' });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

async function seedTasks() {
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'backlog',
      priority VARCHAR(20) DEFAULT 'none',
      ai_summary TEXT,
      due_date TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
    );
  `;

  const insertTasks = await Promise.all(
    tasks.map(
      (task) => sql`
        INSERT INTO tasks (title, description, status, priority, ai_summary, deleted_at)
        VALUES (${task.title}, ${task.description}, ${task.status}, ${task.priority}, ${task.aiSummary}, ${task.deletedAt})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertTasks;
}
