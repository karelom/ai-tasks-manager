'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteTask, restoreTask } from '@/lib/actionsTask';
import { cn } from '@/lib/utils';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';

export function DeleteTaskButton({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteTask(taskId);

        if (result.ok) {
          router.push('/all-task');
          router.refresh();

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              toast.success('Task archived successfully', {
                duration: 5000,
                action: {
                  label: 'Undo',
                  onClick: async () => {
                    const restoreResult = await restoreTask(taskId);
                    if (restoreResult.ok) {
                      toast.success('Task restored');
                      router.push(`/task/${taskId}`);
                    }
                  },
                },
              });
            });
          });
        } else {
          toast.error(result.error || 'Failed to archive task');
        }
      } catch (error) {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'max-w-min justify-start gap-2 text-slate-500 transition-all group',
            'cursor-pointer hover:text-red-600 hover:bg-red-50/50'
          )}
          disabled={isPending}
        >
          {isPending ? (
            <LoadingIcon />
          ) : (
            <Trash2 className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
          )}
          <span className="text-xs font-medium">Delete Task</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task?</AlertDialogTitle>
          <AlertDialogDescription>
            This will <b>permanently archive</b> the task and preserve all associated{' '}
            <b>AI insights</b>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-xs text-white cursor-pointer"
          >
            Delete Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
