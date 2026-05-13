'use client';

import { DragDropProvider } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import { Task } from '@/lib/definitions';
import { ReactNode } from 'react';
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
  return (
    <div className="grid gap-4">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { target } = event.operation;
          if (isSortable(target)) {
            swapTaskOrder(target.data, target.index);
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
