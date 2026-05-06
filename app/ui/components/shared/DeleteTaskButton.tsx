'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteTask, restoreTask } from '@/lib/actionsTask';
import DeleteDialog from '@/ui/components/shared/dialog/DeleteDialog';

export function DeleteTaskButton({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteTask(taskId);

        if (result.ok) {
          // TODO: implement backRoute ?
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
    <DeleteDialog
      dialogTriggerText="Delete Task"
      dialogTitle="Delete Task?"
      dialogContent={
        <>
          This will <b>permanently archive</b> the task and preserve all associated{' '}
          <b>AI insights</b>. This action cannot be undone.
        </>
      }
      dialogActionText="Delete Task"
      isLoading={isLoading}
      onDelete={onDelete}
    />
  );
}
