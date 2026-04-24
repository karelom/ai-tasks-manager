import { cn } from '@/lib/utils';

export default function ProjectHeader({ name }: { name: string }) {
  return (
    <h1
      className={cn(
        'text-3xl font-bold text-slate-900  rounded-lg px-2 -ml-2 transition-colors',
        'cursor-text hover:bg-slate-100'
      )}
    >
      {name}
    </h1>
  );
}
