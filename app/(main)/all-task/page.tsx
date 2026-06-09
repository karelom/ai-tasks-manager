import CreateTaskButton from '@/ui/components/shared/task/CreateTaskButton';
import TaskCardList from '@/ui/components/shared/task/TaskCardList';
import { TaskCardListSkeleton } from '@/ui/components/skeletons/TaskCardSkeleton';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      <Suspense fallback={<TaskCardListSkeleton />}>
        <TaskCardList />
      </Suspense>

      <CreateTaskButton />
    </div>
  );
}
