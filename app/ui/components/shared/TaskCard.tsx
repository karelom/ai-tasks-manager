import { Task } from '@/lib/definitions';
import Link from 'next/link';
import TaskStatusLabel from '@/ui/components/shared/TaskStatusLabel';
import TaskPriorityLabel from '@/ui/components/shared/TaskPriorityLabel';

interface TaskCardProps {
  data: Task;
  backRoute?: string;
}
export default function TaskCard({ data, backRoute }: TaskCardProps) {
  const params = backRoute ? `?back=${backRoute}` : '';
  const href = `/task/${data.id}${params}`;
  return (
    <Link
      key={data.id}
      href={href}
      className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition flex justify-between items-center gap-8 group"
    >
      <div>
        <TaskPriorityLabel data={data.priority} />
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">{data.title}</h3>
        <p className="text-xs text-slate-400">{new Date(data.createdAt).toLocaleString('zh-tw')}</p>
      </div>

      <TaskStatusLabel data={data.status} />
    </Link>
  );
}
