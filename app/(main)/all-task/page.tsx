import { fetchTasks } from '@/lib/data';
import Link from 'next/link';

export default async function Page() {
  const tasks = await fetchTasks();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Generated Tasks</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition flex justify-between items-center group"
          >
            <div>
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">
                {task.title}
              </h3>
              <p className="text-xs text-slate-400">
                {new Date(task.created_at).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {task.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
