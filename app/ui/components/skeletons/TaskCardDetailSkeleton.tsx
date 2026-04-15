import { TaskCardDetailLayout } from '@/ui/components/shared/TaskCardDetail';
import TaskStatusLabelSkeleton from '@/ui/components/skeletons/TaskStatusLabelSkeleton';
import TaskPriorityLabelSkeleton from '@/ui/components/skeletons/TaskPriorityLabelSkeleton';
import TaskDatePickerLabelSkeleton from '@/ui/components/skeletons/TaskDatePickerSkeleton';

export default function TaskCardDetailSkeleton() {
  return (
    <TaskCardDetailLayout
      title={<InlineTitleSkeleton />}
      aiInsight={<AiInsightSkeleton />}
      description={<InlineDescriptionSkeleton />}
      status={<TaskStatusLabelSkeleton />}
      priority={<TaskPriorityLabelSkeleton />}
      dueDate={<TaskDatePickerLabelSkeleton />}
      deleteBtn={<DeleteBtn />}
    />
  );
}

function InlineTitleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-2/3 bg-slate-200 rounded-lg"></div>
    </div>
  );
}

function AiInsightSkeleton() {
  return (
    <div className="flex flex-col gap-1 animate-pulse">
      <div className="h-4 w-1/4 bg-white rounded-lg"></div>
      <div className="h-4 w-full bg-white rounded-lg"></div>
      <br />
      <div className="h-4 w-2/5 bg-white rounded-lg"></div>
      <div className="h-4 w-2/3 bg-white rounded-lg"></div>
    </div>
  );
}

function InlineDescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-1 animate-pulse">
      <div className="h-4 w-3/4 bg-slate-100 rounded-lg"></div>
      <div className="h-4 w-1/4 bg-slate-100 rounded-lg"></div>
      <div className="h-4 w-2/5 bg-slate-100 rounded-lg"></div>
      <div className="h-4 w-2/3 bg-slate-100 rounded-lg"></div>
    </div>
  );
}

function DeleteBtn() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-22 bg-slate-200 rounded-xs"></div>
    </div>
  );
}
