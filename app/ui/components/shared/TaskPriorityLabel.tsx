import { TaskPriority } from '@/lib/definitions';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TaskPriorityLabelProps {
  data: TaskPriority;
}

export default function TaskPriorityLabel({ data }: TaskPriorityLabelProps) {
  return (
    <div className={clsx('flex gap-2', taskPriorityClass(data))}>
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
