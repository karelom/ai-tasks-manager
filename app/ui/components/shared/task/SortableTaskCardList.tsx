'use client';

import { DragDropProvider } from '@dnd-kit/react';
import { arrayMove } from '@dnd-kit/helpers';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import { Task } from '@/lib/definitions';
import { ReactNode, useRef, useTransition } from 'react';
import TaskCard from '@/ui/components/shared/TaskCard';
import { GripVertical } from 'lucide-react';
import { swapTaskOrder } from '@/lib/actionsTask';

export interface SortableTaskCardListProps {
  data: Task[];
  backRoute?: string;
  sortable?: boolean;
}

export default function SortableTaskCardList({
  data,
  backRoute,
  sortable = false,
}: SortableTaskCardListProps) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();
  const newTaskList = useRef(data);

  function getUpdateMap(original: Task[], current: Task[]): Map<string, number> {
    const result = new Map<string, number>();

    current.forEach((task, index) => {
      const originalTask = original[index];
      if (originalTask.orderIdx !== task.orderIdx) {
        result.set(task.id, originalTask.orderIdx!);
      }
    });

    return result;
  }

  return (
    <div className="grid gap-4">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source, target } = event.operation;
          if (isSortable(source) && isSortable(target)) {
            newTaskList.current = arrayMove(newTaskList.current, source.initialIndex, target.index);

            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
              startTransition(() => {
                const updateMap = getUpdateMap(data, newTaskList.current);
                swapTaskOrder(target.data.projectId, updateMap);
              });
            }, 3000);
          }
        }}
      >
        {data.map((task, index) =>
          sortable ? (
            <SortableItem key={task.id} id={task.id} index={index} data={task}>
              <TaskCard key={task.id} data={task} backRoute={backRoute} />
            </SortableItem>
          ) : (
            <TaskCard key={task.id} data={task} backRoute={backRoute} />
          )
        )}
      </DragDropProvider>
    </div>
  );
}

interface SortableItemProps {
  id: string;
  index: number;
  children: ReactNode;
  data: Task;
}
function SortableItem({ id, index, children, data }: SortableItemProps) {
  const { ref, handleRef } = useSortable({ id, index, data });

  return (
    <div
      ref={ref}
      className="grid gap-1 items-center p-2 bg-slate-100 rounded-xl"
      style={{ gridTemplateColumns: '1fr min-content' }}
    >
      {children}
      <GripVertical ref={handleRef} className="w-5 m-1" style={{ cursor: 'grab' }} />
    </div>
  );
}
