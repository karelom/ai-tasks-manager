'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect, useRef, useState } from 'react';
import { Project, Task, VirtualListType } from '@/lib/definitions';
import ProjectCard from '@/ui/components/shared/project/ProjectCard';
import TaskCard from '@/ui/components/shared/task/TaskCard';

type VirtualListProps =
  | { type: VirtualListType.PROJECT; items: Project[] }
  | { type: VirtualListType.TASK; items: Task[]; backRoute?: string };

const ESTIMATE_SIZE: Record<VirtualListType, number> = {
  [VirtualListType.PROJECT]: 74,
  [VirtualListType.TASK]: 98,
};

const GAP = 16;
const OVERSCAN = 5;

export default function VirtualList(props: VirtualListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    let el: HTMLElement | null = listRef.current?.parentElement ?? null;
    while (el) {
      const { overflowY } = getComputedStyle(el);
      if (overflowY === 'auto' || overflowY === 'scroll') break;
      el = el.parentElement;
    }

    const container = el;
    setScrollContainer(container);

    const measure = () => {
      if (!listRef.current || !container) return;
      const listRect = listRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setScrollMargin(listRect.top - containerRect.top + container.scrollTop);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const virtualizer = useVirtualizer({
    count: props.items.length,
    estimateSize: () => ESTIMATE_SIZE[props.type] + GAP,
    overscan: OVERSCAN,
    getScrollElement: () => scrollContainer,
    scrollMargin,
  });

  return (
    <div ref={listRef}>
      <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
              paddingBottom: virtualItem.index < props.items.length - 1 ? `${GAP}px` : undefined,
            }}
          >
            {props.type === VirtualListType.PROJECT ? (
              <ProjectCard data={props.items[virtualItem.index] as Project} />
            ) : (
              <TaskCard data={props.items[virtualItem.index] as Task} backRoute={props.backRoute} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
