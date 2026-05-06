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
import { cn } from '@/lib/utils';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';
import { deleteProject, restoreProject } from '@/lib/actionsProject';

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
          <span className="text-xs font-medium">Delete Project</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will <b>permanently archive</b> the project and corresponding tasks. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-xs text-white cursor-pointer"
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
