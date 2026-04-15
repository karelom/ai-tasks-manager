import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import TaskCardDetail from '@/ui/components/shared/TaskCardDetail';
import { Suspense } from 'react';
import TaskCardDetailSkeleton from '@/ui/components/skeletons/TaskCardDetailSkeleton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Link
          href="/all-task"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Back to All Tasks
        </Link>
      </div>

      <Suspense fallback={<TaskCardDetailSkeleton />}>
        <TaskCardDetail id={id} />
      </Suspense>
    </div>
  );
}
