import { AddTaskType } from '@/lib/schemas';
import EditableTaskItem from '@/ui/components/shared/aiPrompt/EditableTaskItem';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';
import SortableItem from '@/ui/components/shared/SortableItem';
import { arrayMove } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

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
            <span className="text-sm font-medium text-slate-600">Loading Plan...</span>
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <>
          <i className="block m-2 text-xs text-gray-500">
            *note: you can <b>EDIT</b> before saving.
          </i>
          <div className="space-y-2">
            <DragDropProvider
              onDragEnd={(event) => {
                if (event.canceled) return;

                const { source, target } = event.operation;
                if (isSortable(source) && isSortable(target)) {
                  setTasks(arrayMove(tasks, source.initialIndex, target.index));
                }
              }}
            >
              {tasks.map((task: AddTaskType, idx: number) => (
                <SortableItem key={task.title} id={task.title} index={idx}>
                  <EditableTaskItem
                    key={idx}
                    task={task}
                    onChange={(key: string, value: unknown) => update(idx, key, value)}
                  />
                </SortableItem>
              ))}
            </DragDropProvider>
          </div>
        </>
      )}
    </div>
  );
}
