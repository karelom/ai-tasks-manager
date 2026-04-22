import { Project, Task, TaskPlanVariant, TaskPriority, TaskStatus } from '@/lib/definitions';

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
    deletedAt: new Date('2026-03-23 10:00:00Z'),
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

const taskPlanVariants: Omit<TaskPlanVariant, 'id' | 'groupId' | 'createdAt'>[] = [
  {
    input: 'Learn English',
    refinementContext: '',
    steps: [
      {
        title: 'Set learning goals',
        description:
          'Define specific English language skills to improve, such as speaking, writing, or vocabulary.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Choose learning resources',
        description: 'Select books, online courses, or apps that will aid in learning English.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Create a study schedule',
        description: 'Establish a regular time each day or week dedicated to learning English.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Practice speaking',
        description: 'Engage in conversations with native speakers or language exchange partners.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Take assessments',
        description: 'Regularly evaluate progress through quizzes or tests to measure improvement.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Join a language group',
        description: 'Participate in local or online groups focused on English language practice.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
      {
        title: 'Review and adjust goals',
        description: 'Periodically reassess learning goals and adjust strategies as needed.',
        status: TaskStatus.BACKLOG,
        priority: TaskPriority.NONE,
        dueAt: null,
      },
    ],
    isBase: true,
  },
];

export { projects, tasks, taskPlanVariants };
