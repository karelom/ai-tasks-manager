import { fetchActiveTask } from '@/lib/data';
import { notFound } from 'next/navigation';
import { InlineTitle } from '@/ui/components/core/InlineTitle';
import { InlineDescription } from '@/ui/components/core/InlineDescription';
import TaskPriorityLabel from '@/ui/components/shared/TaskPriorityLabel';
import TaskStatusLabel from '@/ui/components/shared/TaskStatusLabel';
import TaskDatePickerLabel from '@/ui/components/shared/TaskDatePickerLabel';
import { ReactNode } from 'react';
import { DeleteTaskButton } from './DeleteTaskButton';

interface TaskCardDetailProps {
  id: string;
}

export default async function TaskCardDetail({ id }: TaskCardDetailProps) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const task = await fetchActiveTask(id);
  if (!task) {
    notFound();
    return;
  }

  return (
    <TaskCardDetailLayout
      title={<InlineTitle taskId={task.id} data={task.title} />}
      aiInsight={
        <p className="text-slate-700">{task.aiSummary || 'AI is analyzing this task...'}</p>
      }
      description={<InlineDescription taskId={task.id} data={task.description} />}
      status={<TaskStatusLabel data={task.status} taskId={task.id} />}
      priority={<TaskPriorityLabel data={task.priority} taskId={task.id} />}
      dueDate={
        <TaskDatePickerLabel
          name="dueAt"
          data={task.dueAt}
          taskId={task.id}
          renderLabel={
            <label className="text-xs font-bold text-slate-400 uppercase">Due date</label>
          }
        />
      }
      deleteBtn={<DeleteTaskButton taskId={task.id} />}
    />
  );
}

interface TaskCardDetailLayoutProps {
  title: ReactNode;
  aiInsight: ReactNode;
  description: ReactNode;
  status: ReactNode;
  priority: ReactNode;
  dueDate: ReactNode;
  deleteBtn: ReactNode;
}
export function TaskCardDetailLayout({
  title,
  aiInsight,
  description,
  status,
  priority,
  dueDate,
  deleteBtn,
}: TaskCardDetailLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-8">
      {/* Left Column: Content */}
      <div className="md:col-span-2 space-y-6">
        {title}

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <h3 className="text-sm font-bold text-blue-700 uppercase mb-2">AI Insights</h3>
          {aiInsight}
        </div>
        <div className="prose max-w-none">
          <h4 className="text-lg font-semibold">Description</h4>
          {description}
        </div>
      </div>

      {/* Right Column: Metadata */}
      <div className="flex flex-col gap-5">
        <div className="grid md:grid-cols-1 grid-cols-2 bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
            {status}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Priority</label>
            {priority}
          </div>

          {dueDate}
        </div>

        <div className="grid grid-cols-1 bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase">Settings</label>
          {deleteBtn}
        </div>
      </div>
    </div>
  );
}
