'use client';

import { createTask } from '@/lib/actionsTask';
import { TaskPriority, TaskStatus } from '@/lib/definitions';
import { AddTaskSchema, AddTaskType, defaultAddTask } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import TaskDatePickerLabel from '@/ui/components/shared/TaskDatePickerLabel';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';
import { useTransition } from 'react';

export interface CreateTaskProps {
  projectId?: string | null;
  parentId?: string | null;
}

export default function CreateTaskForm({ projectId, parentId }: CreateTaskProps) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      ...defaultAddTask,
      projectId,
      parentId,
    },
  });

  const onSubmit = (data: AddTaskType) => {
    startTransition(async () => {
      const result = await createTask(data);
      if (result?.ok) {
        reset();
        router.back();
      }
    });
  };

  const canSubmit = !isSubmitting && !isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            {...register('title')}
            type="text"
            placeholder="Title of the task."
            className={cn(
              'col-auto px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2',
              errors.title
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:ring-blue-500'
            )}
            required
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Write down some memos ..."
            className={cn(
              'col-auto px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2',
              errors.description
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:ring-blue-500'
            )}
          ></textarea>
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm font-medium text-slate-700">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                {...register('status')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 cursor-pointer appearance-none',
                  errors.status
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:ring-blue-500'
                )}
              >
                {Object.values(TaskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </div>
            {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-sm font-medium text-slate-700">
              Priority
            </label>

            <div className="relative">
              <select
                id="priority"
                {...register('priority')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 cursor-pointer appearance-none',
                  errors.priority
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:ring-blue-500'
                )}
              >
                {Object.values(TaskPriority).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0) + priority.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </div>
            {errors.priority && <p className="text-xs text-red-500">{errors.priority.message}</p>}
          </div>

          <TaskDatePickerLabel
            name="dueAt"
            control={control}
            renderLabel={<div className="text-sm font-medium text-slate-700">Due Date</div>}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full sm:w-auto sm:flex sm:justify-self-end px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
      >
        {canSubmit ? (
          'Add Task'
        ) : (
          <span className="flex items-center gap-2">
            <LoadingIcon /> Adding...
          </span>
        )}
      </button>
    </form>
  );
}
