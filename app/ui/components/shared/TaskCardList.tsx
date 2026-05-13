import { fetchTasks } from '@/lib/actionsTask';
import { notFound } from 'next/navigation';
import { Task } from '@/lib/definitions';
import SortableTaskCardList from '@/ui/components/shared/task/SortableTaskCardList';

interface TaskCardListProps {
  payload?: Task[];
  backRoute?: string;
  sortable?: boolean;
}

/**
 * Show the given task card list, will fetch all tasks if payload is not provided
 *
 * @param payload Task list to display
 * @param backRoute determine where the task is coming from
 * @returns
 */
export default async function TaskCardList({
  payload,
  backRoute,
  sortable = false,
}: TaskCardListProps) {
  let tasks = payload;
  if (!tasks) {
    const result = await fetchTasks();
    if (!result.ok) {
      notFound();
      return;
    }
    tasks = result.data!;
  }

  return <SortableTaskCardList data={tasks} backRoute={backRoute} sortable={sortable} />;
}
