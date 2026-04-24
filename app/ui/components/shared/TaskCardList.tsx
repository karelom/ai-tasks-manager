import TaskCard from '@/ui/components/shared/TaskCard';
import { fetchTasks } from '@/lib/actionsTask';
import { notFound } from 'next/navigation';
import { Task } from '@/lib/definitions';

interface TaskCardListProps {
  payload?: Task[];
}

/**
 * Show the given task card list, will fetch all tasks if payload is not provided
 *
 * @param payload - Task[]
 * @returns
 */
export default async function TaskCardList({ payload }: TaskCardListProps) {
  let tasks = payload;
  if (!tasks) {
    const result = await fetchTasks();
    if (!result.ok) {
      notFound();
      return;
    }
    tasks = result.data!;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} data={task} />
      ))}
    </div>
  );
}
