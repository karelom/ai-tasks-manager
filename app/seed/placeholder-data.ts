import { Project, Task, TaskPriority, TaskStatus } from '@/lib/definitions';

const projects: Omit<Project, 'createdAt' | 'updatedAt' | 'deletedAt'>[] = [
  {
    id: '1042cb4b-e391-4966-9baa-562f47f768a2',
    name: 'AI Task Manager',
    description: 'Building a Next.js 15 app with Neon and Gemini',
    colorCode: '#8b5cf6',
  },
];

const tasks: Omit<Task, 'id' | 'parentId' | 'dueAt' | 'createdAt' | 'updatedAt'>[] = [
  {
    projectId: projects[0].id,
    title: 'Refactor C++ Engine',
    description: 'Optimize the memory allocation for the packet handler.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    aiSummary: 'AI suggests using a custom pool allocator to reduce fragmentation.',
    deletedAt: null,
  },
  {
    projectId: projects[0].id,
    title: 'Learn Tailwind Grid',
    description: 'Master the responsive grid system for the new layout.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    aiSummary: 'Focus on the fractional unit (fr) and gap utilities.',
    deletedAt: null,
  },
  {
    projectId: projects[0].id,
    title: 'Old Bug Report',
    description: 'Fix the flickering issue in the sidebar.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    aiSummary: 'Likely a CSS transition conflict.',
    deletedAt: '2026-03-23 10:00:00Z',
  },
  {
    projectId: projects[0].id,
    title: 'English Interview Prep',
    description: 'Practice STAR method for behavioral questions.',
    status: TaskStatus.BACKLOG,
    priority: TaskPriority.NONE,
    aiSummary: 'AI suggests focusing on the "Frontend Architecture" success story.',
    deletedAt: null,
  },
];

export { projects, tasks };
