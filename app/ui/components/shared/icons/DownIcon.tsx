import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

export default function DownIcon({ className }: { className?: string }) {
  return <ChevronDownIcon className={cn('w-4 h-4', className)} />;
}
