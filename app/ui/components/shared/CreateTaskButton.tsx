import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CreateTaskProps } from '@/ui/components/shared/CreateTaskForm';

export default function CreateTaskButton({ projectId, parentId }: CreateTaskProps) {
  return (
    <Link
      href={{
        pathname: '/task/new',
        query: { projectId, parentId },
      }}
      className="fixed bottom-8 right-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group"
    >
      <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
      <span className="font-semibold">New Task</span>
    </Link>
  );
}
