import { Task, TaskPriority, TaskStatus } from '@/lib/definitions';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

interface TaskCardProps {
  data: Task;
}
export default function TaskCard({ data }: TaskCardProps) {
  return (
    <Link
      key={data.id}
      href={`/task/${data.id}`}
      className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition flex justify-between items-center group"
    >
      <div>
        <span className={clsx('flex gap-2', taskPriorityClass(data.priority))}>
          <ChartBarIcon className="w-4" />
          {data.priority}
        </span>
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">{data.title}</h3>
        <p className="text-xs text-slate-400">
          {new Date(data.created_at).toLocaleString('zh-tw')}
        </p>
      </div>

      <span
        className={clsx('px-3 py-1 rounded-full text-xs font-medium', taskStatusClass(data.status))}
      >
        {data.status}
      </span>
    </Link>
  );
}

function taskPriorityClass(priority: TaskPriority) {
  switch (priority) {
    case TaskPriority.NONE:
      return '';
    case TaskPriority.LOW:
      return '';
    case TaskPriority.MEDIUM:
      return '';
    case TaskPriority.HIGH:
      return '';
  }
}

function taskStatusClass(status: TaskStatus) {
  switch (status) {
    case TaskStatus.BACKLOG:
      return 'bg-gray-100 text-gray-700';
    case TaskStatus.IN_PROGRESS:
      return 'bg-amber-100 text-amber-700';
    case TaskStatus.PENDING:
      return 'bg-orange-100 text-orange-700';
    case TaskStatus.COMPLETED:
      return 'bg-green-100 text-green-700';
  }
}
