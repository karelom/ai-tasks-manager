import { ProjectCardDetailLayout } from '@/ui/components/shared/ProjectCardDetail';
import { TaskCardListSkeleton } from './TaskCardSkeleton';

export default function ProjectCardDetailSkeleton() {
  return (
    <ProjectCardDetailLayout
      header={<HeaderSkeleton />}
      progressBar={<ProgressBarSkeleton />}
      taskCardList={<TaskCardListSkeleton />}
    />
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-2/3 bg-slate-200 rounded-lg"></div>
    </div>
  );
}

function ProgressBarSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-2 w-40 bg-slate-100 rounded-md"></div>
      <div className="h-2 w-full bg-slate-500 rounded"></div>
    </div>
  );
}
