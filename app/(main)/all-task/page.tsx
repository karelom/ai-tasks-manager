import CreateAIPromptButton from '@/ui/components/shared/CreateAIPromptButton';
import CreateTaskButton from '@/ui/components/shared/CreateTaskButton';
import TaskCardList from '@/ui/components/shared/TaskCardList';
import { TaskCardListSkeleton } from '@/ui/components/skeletons/TaskCardSkeleton';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Generated Tasks</h1>
      <CreateTaskButton />
      <CreateAIPromptButton />

      <Suspense fallback={<TaskCardListSkeleton />}>
        <TaskCardList />
      </Suspense>
    </div>
  );
}
