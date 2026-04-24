import { Task } from '@/lib/definitions';

export default function ProgressBar({ tasks }: { tasks: Task[] }) {
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const total = tasks.length || 1;
  const percent = Math.round((completed / total) * 100);

  return (
    <div>
      <div className="text-sm text-gray-500 mb-1">
        {completed} / {total} completed
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-black rounded" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
