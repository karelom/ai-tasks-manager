'use client';

import { DragDropProvider } from '@dnd-kit/react';
import { arrayMove } from '@dnd-kit/helpers';
import { isSortable } from '@dnd-kit/react/sortable';
import { Task, VirtualListType } from '@/lib/definitions';
import { useRef, useTransition } from 'react';
import TaskCard from '@/ui/components/shared/task/TaskCard';
import { swapTaskOrder } from '@/lib/actionsTask';
import SortableItem from '@/ui/components/shared/SortableItem';
import VirtualList from '@/ui/components/shared/VirtualList';

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

  if (!sortable) {
    return <VirtualList type={VirtualListType.TASK} items={data} backRoute={backRoute} />;
  }

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
        {data.map((task, index) => (
          <SortableItem key={task.id} id={task.id} index={index} data={task}>
            <TaskCard key={task.id} data={task} backRoute={backRoute} />
          </SortableItem>
        ))}
      </DragDropProvider>
    </div>
  );
}
