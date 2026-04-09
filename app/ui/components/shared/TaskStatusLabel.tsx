'use client';

import { TaskStatus } from '@/lib/definitions';
import { InlineSelect, InlineSelectOption } from './InlineSelect';
import { updateTask } from '@/lib/actions';
import { cn } from '@/lib/utils';

interface TaskStatusLabelProps {
  data: TaskStatus;
  taskId?: string;
}

const STATUS_OPTIONS: InlineSelectOption<TaskStatus>[] = [
  { value: TaskStatus.BACKLOG, label: 'Backlog', shortcut: '⌘B' },
  { value: TaskStatus.PENDING, label: 'Pending', shortcut: '⌘P' },
  { value: TaskStatus.IN_PROGRESS, label: 'In Progress', shortcut: '⌘I' },
  { value: TaskStatus.COMPLETED, label: 'Completed', shortcut: '⌘C' },
];

export default function TaskStatusLabel({ data, taskId }: TaskStatusLabelProps) {
  const handleStatusChange = async (status: TaskStatus) => {
    if (!taskId) return { ok: true };
    return await updateTask(taskId, { status });
  };

  if (taskId) {
    return (
      <InlineSelect<TaskStatus>
        data={data}
        options={STATUS_OPTIONS}
        renderTrigger={(selected) => <DisplayLabel data={selected} />}
        onSave={handleStatusChange}
      />
    );
  } else {
    return <DisplayLabel data={data} />;
  }
}

function DisplayLabel({ data }: { data: TaskStatus }) {
  return (
    <div
      className={cn('px-3 py-1 rounded-full text-xs font-medium max-w-max', taskStatusClass(data))}
    >
      {data}
    </div>
  );
}

function taskStatusClass(status: TaskStatus) {
  switch (status) {
    case TaskStatus.BACKLOG:
      return 'bg-gray-100 text-gray-700';
    case TaskStatus.IN_PROGRESS:
      return 'bg-amber-100 text-amber-700';
    case TaskStatus.PENDING:
      return 'bg-orange-100 text-orange-700';
    case TaskStatus.COMPLETED:
      return 'bg-green-100 text-green-700';
  }
}
