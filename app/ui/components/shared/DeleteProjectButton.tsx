'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteProject, restoreProject } from '@/lib/actionsProject';
import DeleteDialog from '@/ui/components/shared/dialog/DeleteDialog';

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteProject(projectId);

        if (result.ok) {
          // TODO: implement backRoute ?
          router.push('/all-project');
          router.refresh();

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              toast.success('Project archived successfully', {
                duration: 5000,
                action: {
                  label: 'Undo',
                  onClick: async () => {
                    const restoreResult = await restoreProject(projectId);
                    if (restoreResult.ok) {
                      toast.success('Project restored');
                      router.push(`/project/${projectId}`);
                    }
                  },
                },
              });
            });
          });
        } else {
          toast.error(result.error || 'Failed to archive project');
        }
      } catch (error) {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    });
  };

  return (
    <DeleteDialog
      dialogTriggerText="Delete Project"
      dialogTitle="Delete Project?"
      dialogContent={
        <>
          This will <b>permanently archive</b> the project and corresponding tasks. This action
          cannot be undone.
        </>
      }
      dialogActionText="Delete Project"
      isLoading={isLoading}
      onDelete={onDelete}
    />
  );
}
