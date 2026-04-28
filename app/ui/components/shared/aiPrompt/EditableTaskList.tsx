import { AddTaskType } from '@/lib/schemas';
import EditableTaskItem from '@/ui/components/shared/aiPrompt/EditableTaskItem';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';

interface EditableStepListProps {
  tasks: AddTaskType[];
  setTasks: (tasks: AddTaskType[]) => void;
  isLoading: boolean;
}

export default function EditableTaskList({ tasks, setTasks, isLoading }: EditableStepListProps) {
  function update(idx: number, key: string, value: unknown) {
    const next = [...tasks];
    next[idx] = { ...next[idx], [key]: value };
    setTasks(next);
  }

  return (
    <div className="relative border rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-opacity">
          <div className="flex flex-col items-center gap-2">
            <LoadingIcon />
            <span className="text-sm font-medium text-slate-600">Refining Plan...</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {tasks.map((task: AddTaskType, idx: number) => (
          <EditableTaskItem
            key={idx}
            idx={idx}
            task={task}
            onChange={(key: string, value: unknown) => update(idx, key, value)}
          />
        ))}
      </div>
    </div>
  );
}
