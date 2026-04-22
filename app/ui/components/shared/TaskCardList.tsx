import TaskCard from '@/ui/components/shared/TaskCard';
import { fetchTasks } from '@/lib/actions';

export default async function TaskCardList() {
  const tasks = await fetchTasks();

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} data={task} />
      ))}
    </div>
  );
}
