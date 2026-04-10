'use client';

import { createTask } from '@/lib/actions';
import { TaskPriority, TaskStatus } from '@/lib/definitions';
import { AddTaskSchema, AddTaskType, defaultAddTask } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from 'lucide-react';
import { InlineDatePicker } from '@/ui/components/shared/InlineDatePicker';
import { Field, FieldLabel } from '@/components/ui/field';
import { cn, formatLocaleDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import HintInvalidLabel from '@/ui/components/shared/HintInvalidLabel';

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
    control,
  } = useForm({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      ...defaultAddTask,
      projectId,
      parentId,
    },
  });

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

          <div className="flex flex-col gap-2">
            <Controller
              name="dueAt"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                  <FieldLabel htmlFor={field.name}>
                    <div className="text-sm font-medium text-slate-700">Due Date</div>
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={field.name}
                        variant="outline"
                        className={cn(
                          'w-full p-5 font-normal border rounded-lg bg-white border-slate-200 cursor-pointer transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500',
                          !field.value && 'text-muted-foreground'
                        )}
                        aria-invalid={fieldState.invalid}
                      >
                        {field.value ? formatLocaleDate(field.value) : <span>Select a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(val) => {
                          field.onChange(val);
                        }}
                        disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                        className="rounded-lg border"
                        autoFocus
                      />

                      <div className="px-3 pb-2 border-slate-100 flex items-center justify-between gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-slate-500 hover:text-red-600 h-8 px-2"
                          onClick={() => {
                            field.onChange(null);
                          }}
                        >
                          Clear
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs h-8 px-2"
                          onClick={() => field.onChange(new Date())}
                        >
                          Today
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && <HintInvalidLabel data={fieldState.error?.message} />}
                </Field>
              )}
            />
            {/* <InlineDatePicker /> */}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto sm:flex sm:justify-self-end px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
