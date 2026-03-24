import { TaskStatus } from '@/lib/definitions';
import clsx from 'clsx';

interface TaskStatusLabelProps {
  data: TaskStatus;
}

export default function TaskStatusLabel({ data }: TaskStatusLabelProps) {
  return (
    <div
      className={clsx(
        'px-3 py-1 rounded-full text-xs font-medium max-w-max',
        taskStatusClass(data)
      )}
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
