import postgres from 'postgres';
import { projects, tasks, taskPlanVariants } from './placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', transform: postgres.camel });

export async function GET() {
  try {
    await sql.begin(async (trx: unknown) => {
      const trxSql = trx as postgres.Sql;

      await seedProjects(trxSql);
      await seedTasks(trxSql);
      await seedTaskPlanGroups(trxSql);
      await seedTaskPlanVariants(trxSql);
    });
    return Response.json({ message: 'Database seeded successfully' });
  } catch (err) {
    console.error('Full Seeding Error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    const cause = err instanceof Error ? err.cause : {};
    return Response.json({ message, cause }, { status: 500 });
  }
}

async function seedProjects(trxSql = sql) {
  try {
    await trxSql`
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

    await trxSql`
        INSERT INTO projects ${trxSql(projects)}
        ON CONFLICT (id) DO NOTHING;
      `;
  } catch (err) {
    throw new Error('could not seed projects', { cause: err });
  }
}

async function seedTasks(trxSql = sql) {
  try {
    await trxSql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID REFERENCES projects(id),
        parent_id UUID REFERENCES tasks(id),
        order_idx INTEGER,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'backlog',
        priority VARCHAR(20) DEFAULT 'none',
        ai_summary TEXT,
        due_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP WITH TIME ZONE
      );
  
      CREATE UNIQUE INDEX uniq_project_order
      ON tasks USING btree (project_id, order_idx);
    `;

    await trxSql`
      INSERT INTO tasks ${trxSql(tasks)}
      ON CONFLICT (id) DO NOTHING;
    `;
  } catch (err) {
    throw new Error('could not seed tasks', { cause: err });
  }
}

async function seedTaskPlanGroups(trxSql = sql) {
  await trxSql`
    CREATE TABLE IF NOT EXISTS task_plan_groups (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      normalized_input TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function seedTaskPlanVariants(trxSql = sql) {
  await trxSql`
    CREATE TABLE IF NOT EXISTS task_plan_variants (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      group_id UUID REFERENCES task_plan_groups(id),
      input TEXT NOT NULL,
      refinement_context TEXT,
      steps JSONB NOT NULL,
      is_base BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const taskPlanVariantsPayload = {
    ...taskPlanVariants[0],
    steps: JSON.stringify(taskPlanVariants[0].steps),
  };
  await trxSql`
        INSERT INTO task_plan_variants ${trxSql(taskPlanVariantsPayload)}
        ON CONFLICT (id) DO NOTHING;
      `;
}
