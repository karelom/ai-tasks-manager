import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export default function LoadingIcon({ className }: { className?: string }) {
  return <Loader className={cn('h-4 w-4 animate-spin', className)} />;
}
