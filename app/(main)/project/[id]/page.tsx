import Link from 'next/link';
import ProjectCardDetail from '@/ui/components/shared/ProjectCardDetail';
import { Suspense } from 'react';
import TaskCardDetailSkeleton from '@/ui/components/skeletons/TaskCardDetailSkeleton';
import { ChevronLeft } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Link
          href="/all-project"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to All Projects
        </Link>
      </div>

      <Suspense fallback={<TaskCardDetailSkeleton />}>
        <ProjectCardDetail id={id} />
      </Suspense>
    </div>
  );
}
