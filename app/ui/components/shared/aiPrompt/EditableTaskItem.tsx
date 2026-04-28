import { AddTaskType } from '@/lib/schemas';

interface EditableStepItemProps {
  idx: number;
  task: AddTaskType;
  onChange: (key: string, value: unknown) => void;
}

export default function EditableTaskItem({ idx, task, onChange }: EditableStepItemProps) {
  return (
    <div className="border p-2 rounded space-y-1">
      <div className="flex gap-0.5">
        <div className="inline font-semibold">{idx + 1}.</div>
        <input
          value={task.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full font-medium"
        />
      </div>

      <textarea
        value={task.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full text-sm text-gray-600"
      />

      <div className="flex gap-2 text-xs">
        <select value={task.status} onChange={(e) => onChange('status', e.target.value)}>
          <option>backlog</option>
          <option>pending</option>
          <option>in-progress</option>
          <option>completed</option>
        </select>

        <select value={task.priority} onChange={(e) => onChange('priority', e.target.value)}>
          <option>none</option>
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
      </div>
    </div>
  );
}
