import Link from 'next/link';
import TaskCardDetail from '@/ui/components/shared/TaskCardDetail';
import { Suspense } from 'react';
import TaskCardDetailSkeleton from '@/ui/components/skeletons/TaskCardDetailSkeleton';
import { ChevronLeft } from 'lucide-react';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ back?: string }>;
}) {
  const [paramsResult, searchParamsResult] = await Promise.all([params, searchParams]);

  const id = paramsResult.id;
  const back = searchParamsResult.back;
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Link
          href={back ?? '/all-task'}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Return
        </Link>
      </div>

      <Suspense fallback={<TaskCardDetailSkeleton />}>
        <TaskCardDetail id={id} />
      </Suspense>
    </div>
  );
}
