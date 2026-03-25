import TaskPriorityLabelSkeleton from '@/ui/components/skeletons/TaskPriorityLabelSkeleton';
import TaskStatusLabelSkeleton from '@/ui/components/skeletons/TaskStatusLabelSkeleton';

export function TaskCardListSkeleton() {
  return (
    <div className="grid gap-4">
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex justify-between items-center gap-8 animate-pulse">
      <div className="w-full space-y-2">
        <TaskPriorityLabelSkeleton />

        {/* Title placeholder */}
        <div className="h-4 w-full bg-slate-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-slate-200 rounded-md"></div>

        {/* Date placeholder */}
        <div className="h-4 w-32 bg-slate-50 rounded"></div>
      </div>

      <TaskStatusLabelSkeleton />
    </div>
  );
}
