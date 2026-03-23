import { fetchTasks } from '@/lib/data';
import { TaskPriority, TaskStatus } from '@/lib/definitions';
import clsx from 'clsx';
import Link from 'next/link';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Generated Tasks</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/task/${task.id}`}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition flex justify-between items-center group"
          >
            <div>
              <span className={clsx('flex gap-2', taskPriorityClass(task.priority))}>
                <ChartBarIcon className="w-4" />
                {task.priority}
              </span>
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">
                {task.title}
              </h3>
              <p className="text-xs text-slate-400">
                {new Date(task.created_at).toLocaleString('zh-tw')}
              </p>
            </div>

            <span
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-medium',
                taskStatusClass(task.status)
              )}
            >
              {task.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
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
