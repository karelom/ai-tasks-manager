import { TaskPriority, TaskStatus } from '@/lib/definitions';
import { AddTaskType } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import DownIcon from '@/ui/components/shared/icons/DownIcon';
import { InlineTitle } from '@/ui/components/core/InlineTitle';

interface EditableStepItemProps {
  task: AddTaskType;
  onChange: (key: string, value: unknown) => void;
}

export default function EditableTaskItem({ task, onChange }: EditableStepItemProps) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition space-y-4">
      <InlineTitle
        data={task.title}
        onUpdate={(title) => {
          return new Promise((resolve) => {
            onChange('title', title);
            resolve({ ok: true });
          });
        }}
        className="text-xl"
      />

      <textarea
        value={task.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full text-sm text-gray-600"
      />

      <div className="flex gap-2 text-sm">
        <div className="relative">
          <select
            value={task.status}
            onChange={(e) => onChange('status', e.target.value)}
            className={cn(
              'w-30 px-4 py-1 border rounded-lg bg-white border-slate-200 cursor-pointer appearance-none',
              'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          >
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <DownIcon />
          </div>
        </div>

        <div className="relative">
          <select
            value={task.priority}
            onChange={(e) => onChange('priority', e.target.value)}
            className={cn(
              'w-30 px-4 py-1 border rounded-lg bg-white border-slate-200 cursor-pointer appearance-none',
              'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          >
            {Object.values(TaskPriority).map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0) + priority.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <DownIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
