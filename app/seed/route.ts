import postgres from 'postgres';
import { projects, tasks } from './placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    await sql.begin(async () => {
      await seedProjects();
      seedTasks();
    });
    return Response.json({ message: 'Database seeded successfully' });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

async function seedProjects() {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      color_code VARCHAR(7) DEFAULT '#3b82f6',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
    );
  `;

  const insertProjects = await Promise.all(
    projects.map(
      (p) => sql`
        INSERT INTO projects (id, name, description, color_code)
        VALUES (${p.id}, ${p.name}, ${p.description}, ${p.colorCode})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertProjects;
}

async function seedTasks() {
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
      parent_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'backlog',
      priority VARCHAR(20) DEFAULT 'none',
      ai_summary TEXT,
      due_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
    );
  `;

  const insertTasks = await Promise.all(
    tasks.map(
      (t) => sql`
        INSERT INTO tasks (project_id, title, description, status, priority, ai_summary, deleted_at)
        VALUES (${t.projectId}, ${t.title}, ${t.description}, ${t.status}, ${t.priority}, ${t.aiSummary}, ${t.deletedAt})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertTasks;
}
