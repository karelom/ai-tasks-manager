import { Task } from '@/lib/definitions';
import { useSortable } from '@dnd-kit/react/sortable';
import { ReactNode } from 'react';
import GripIcon from '@/ui/components/shared/icons/GripIcon';

interface SortableItemProps {
  id: string;
  index: number;
  children: ReactNode;
  data?: Task;
}
export default function SortableItem({ id, index, children, data }: SortableItemProps) {
  const { ref, handleRef } = useSortable({ id, index, data });

  return (
    <div
      ref={ref}
      className="grid gap-1 items-center p-2 bg-slate-100 rounded-xl"
      style={{ gridTemplateColumns: '1fr min-content' }}
    >
      {children}
      <div ref={handleRef}>
        <GripIcon />
      </div>
    </div>
  );
}
