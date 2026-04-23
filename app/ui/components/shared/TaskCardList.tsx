import TaskCard from '@/ui/components/shared/TaskCard';
import { fetchTasks } from '@/lib/actionsTask';
import { notFound } from 'next/navigation';

export default async function TaskCardList() {
  const result = await fetchTasks();
  if (!result.ok) {
    notFound();
    return;
  }

  const tasks = result.data!;
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} data={task} />
      ))}
    </div>
  );
}
