import { Task, TaskPriority, TaskStatus } from '@/lib/definitions';

const tasks: Omit<Task, 'id' | 'due_date' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Refactor C++ Engine',
    description: 'Optimize the memory allocation for the packet handler.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    ai_summary: 'AI suggests using a custom pool allocator to reduce fragmentation.',
    deleted_at: null,
  },
  {
    title: 'Learn Tailwind Grid',
    description: 'Master the responsive grid system for the new layout.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    ai_summary: 'Focus on the fractional unit (fr) and gap utilities.',
    deleted_at: null,
  },
  {
    title: 'Old Bug Report',
    description: 'Fix the flickering issue in the sidebar.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    ai_summary: 'Likely a CSS transition conflict.',
    deleted_at: '2026-03-23 10:00:00Z',
  },
  {
    title: 'English Interview Prep',
    description: 'Practice STAR method for behavioral questions.',
    status: TaskStatus.BACKLOG,
    priority: TaskPriority.NONE,
    ai_summary: 'AI suggests focusing on the "Frontend Architecture" success story.',
    deleted_at: null,
  },
];

export { tasks };
