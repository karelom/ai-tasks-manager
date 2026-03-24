export type Task = {
  id: string;
  projectId: string | null;
  /** for subtask */
  parentId: string | null;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  /** for LLM suggestion */
  aiSummary: string;
  dueAt: string;
  createdAt: string;
  updatedAt: string;
  /** soft deletion */
  deletedAt: string | null;
};

export enum TaskStatus {
  BACKLOG = 'backlog',
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
