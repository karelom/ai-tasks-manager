import { fetchActiveTask } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const task = await fetchActiveTask(id);
  if (!task) {
    notFound();
    return;
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column: Content */}
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">{task.title}</h1>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <h3 className="text-sm font-bold text-blue-700 uppercase mb-2">AI Insights</h3>
          <p className="text-slate-700">{task.aiSummary || 'AI is analyzing this task...'}</p>
        </div>
        <div className="prose max-w-none">
          <h4 className="text-lg font-semibold">Description</h4>
          <p className="text-slate-600">{task.description || 'No description provided.'}</p>
        </div>
      </div>

      {/* Right Column: Metadata */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
          <div className="capitalize font-medium">{task.status}</div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Priority</label>
          <div className="capitalize font-medium">{task.priority}</div>
        </div>
      </div>
    </div>
  );
}
