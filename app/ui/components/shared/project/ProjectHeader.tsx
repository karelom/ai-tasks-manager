import { cn } from '@/lib/utils';

export default function ProjectHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-slate-900 cursor-text hover:bg-slate-100 rounded-lg px-2 -ml-2 transition-colors">
        {name}
      </h1>

      <button className={cn('px-1 text-gray-500 rounded-xl cursor-pointer', 'hover:bg-slate-100')}>
        ⋯
      </button>
    </div>
  );
}
