'use client';

import { createTask } from '@/lib/actions';
import { TaskPriority, TaskStatus } from '@/lib/definitions';
import { AddTaskSchema, AddTaskType, defaultAddTask, isInvalidDate } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface CreateTaskProps {
  projectId?: string | null;
  parentId?: string | null;
}

export default function CreateTaskForm({ projectId, parentId }: CreateTaskProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      ...defaultAddTask,
      projectId,
      parentId,
    },
  });

  const dueDateValue = watch('dueAt');

  const onSubmit = async (data: AddTaskType) => {
    const result = await createTask(data);
    if (result?.ok) {
      reset();
      // TODO: close modal ?
      router.back();
    }
  };

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
            className={clsx(
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
            className={clsx(
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

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm font-medium text-slate-700">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                {...register('status')}
                className={clsx(
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
                className={clsx(
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

          <div className="flex flex-col gap-2">
            <label htmlFor="dueAt" className="text-sm font-medium text-slate-700">
              Due Date
            </label>
            <div className="relative">
              <input
                id="dueAt"
                {...register('dueAt', {
                  valueAsDate: true,
                })}
                type="date"
                className={clsx(
                  'w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 cursor-pointer transition-colors',
                  '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
                  errors.dueAt
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:ring-blue-500'
                )}
                onClick={(e) => e.currentTarget.showPicker()}
                onKeyDown={(e) => e.preventDefault()}
              />
              {isInvalidDate(dueDateValue) && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 bg-white pointer-events-none">
                  Select due date...
                </span>
              )}
            </div>
            {errors.dueAt && <p className="text-xs text-red-500">{errors.dueAt.message}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex justify-self-end px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
