import { fetchActiveTask } from '@/lib/data';
import TaskPriorityLabel from '@/ui/components/shared/TaskPriorityLabel';
import TaskStatusLabel from '@/ui/components/shared/TaskStatusLabel';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { InlineTitle } from '@/ui/components/shared/InlineTitle';
import { InlineDescription } from '@/ui/components/shared/InlineDescription';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const task = await fetchActiveTask(id);
  if (!task) {
    notFound();
    return;
  }

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

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="md:col-span-2 space-y-6">
          <InlineTitle taskId={task.id} data={task.title} />

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <h3 className="text-sm font-bold text-blue-700 uppercase mb-2">AI Insights</h3>
            <p className="text-slate-700">{task.aiSummary || 'AI is analyzing this task...'}</p>
          </div>
          <div className="prose max-w-none">
            <h4 className="text-lg font-semibold">Description</h4>
            <InlineDescription taskId={task.id} data={task.description} />
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
            <TaskStatusLabel data={task.status} taskId={task.id} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Priority</label>
            <TaskPriorityLabel data={task.priority} />
          </div>
        </div>
      </div>
    </div>
  );
}
