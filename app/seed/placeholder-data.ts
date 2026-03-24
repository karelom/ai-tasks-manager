import { Task, TaskPriority, TaskStatus } from '@/lib/definitions';

const tasks: Omit<Task, 'id' | 'projectId' | 'parentId' | 'dueAt' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Refactor C++ Engine',
    description: 'Optimize the memory allocation for the packet handler.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    aiSummary: 'AI suggests using a custom pool allocator to reduce fragmentation.',
    deletedAt: null,
  },
  {
    title: 'Learn Tailwind Grid',
    description: 'Master the responsive grid system for the new layout.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    aiSummary: 'Focus on the fractional unit (fr) and gap utilities.',
    deletedAt: null,
  },
  {
    title: 'Old Bug Report',
    description: 'Fix the flickering issue in the sidebar.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    aiSummary: 'Likely a CSS transition conflict.',
    deletedAt: '2026-03-23 10:00:00Z',
  },
  {
    title: 'English Interview Prep',
    description: 'Practice STAR method for behavioral questions.',
    status: TaskStatus.BACKLOG,
    priority: TaskPriority.NONE,
    aiSummary: 'AI suggests focusing on the "Frontend Architecture" success story.',
    deletedAt: null,
  },
];

export { tasks };
