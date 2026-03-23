import { fetchTasks } from '@/lib/data';
import TaskCard from '@/ui/components/shared/TaskCard';

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Generated Tasks</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} data={task} />
        ))}
      </div>
    </div>
  );
}
