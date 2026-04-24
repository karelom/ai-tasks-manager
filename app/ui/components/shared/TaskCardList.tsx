import TaskCard from '@/ui/components/shared/TaskCard';
import { fetchTasks } from '@/lib/actionsTask';
import { notFound } from 'next/navigation';
import { Task } from '@/lib/definitions';

interface TaskCardListProps {
  payload?: Task[];
  backRoute?: string;
}

/**
 * Show the given task card list, will fetch all tasks if payload is not provided
 *
 * @param payload Task list to display
 * @param backRoute determine where the task is coming from
 * @returns
 */
export default async function TaskCardList({ payload, backRoute }: TaskCardListProps) {
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
        <TaskCard key={task.id} data={task} backRoute={backRoute} />
      ))}
    </div>
  );
}
