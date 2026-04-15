'use client';

import { updateTask } from '@/lib/actions';
import { TaskPriority } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { InlineSelect, InlineSelectOption } from '@/ui/components/core/InlineSelect';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface TaskPriorityLabelProps {
  data: TaskPriority;
  taskId?: string;
}

const PRIORITY_OPTIONS: InlineSelectOption<TaskPriority>[] = [
  { value: TaskPriority.NONE, label: 'None' },
  { value: TaskPriority.LOW, label: 'Low' },
  { value: TaskPriority.MEDIUM, label: 'Medium' },
  { value: TaskPriority.HIGH, label: 'High' },
];

export default function TaskPriorityLabel({ data, taskId }: TaskPriorityLabelProps) {
  const handleStatusChange = async (priority: TaskPriority) => {
    if (!taskId) return { ok: true };
    return await updateTask(taskId, { priority });
  };

  if (taskId) {
    return (
      <InlineSelect<TaskPriority>
        data={data}
        options={PRIORITY_OPTIONS}
        shortcut="P"
        placeholder="Search priority ..."
        renderTrigger={(selected) => (
          <DisplayLabel
            data={selected}
            className="cursor-pointer px-3 py-1 hover:bg-slate-50 hover:shadow-md rounded-full"
          />
        )}
        onSave={handleStatusChange}
      />
    );
  } else {
    return <DisplayLabel data={data} />;
  }
}

function DisplayLabel({ data, className }: { data: TaskPriority; className?: string }) {
  return (
    <div className={cn('flex gap-2', className, taskPriorityClass(data))}>
      <ChartBarIcon className="w-4" />
      {data}
    </div>
  );
}

function taskPriorityClass(priority: TaskPriority) {
  switch (priority) {
    case TaskPriority.NONE:
      return '';
    case TaskPriority.LOW:
      return '';
    case TaskPriority.MEDIUM:
      return '';
    case TaskPriority.HIGH:
      return '';
  }
}
