import CreateAIPromptButton from '@/ui/components/shared/CreateAIPromptButton';
import ProjectCardList from '@/ui/components/shared/ProjectCardList';
import { TaskCardListSkeleton } from '@/ui/components/skeletons/TaskCardSkeleton';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <CreateAIPromptButton />

      <Suspense fallback={<TaskCardListSkeleton />}>
        <ProjectCardList />
      </Suspense>
    </div>
  );
}
