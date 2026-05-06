import { Trash2 } from 'lucide-react';

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
import { ReactNode } from 'react';

interface DeleteDialogProps {
  dialogTriggerText: string;
  dialogTitle: string;
  dialogContent: ReactNode;
  dialogActionText: string;
  isLoading: boolean;
  onDelete: () => void;
}

export default function DeleteDialog({
  dialogTriggerText,
  dialogTitle,
  dialogContent,
  dialogActionText,
  isLoading,
  onDelete,
}: DeleteDialogProps) {
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
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <Trash2 className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
          )}
          <span className="text-xs font-medium">{dialogTriggerText}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogContent}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-xs text-white cursor-pointer"
          >
            {dialogActionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
