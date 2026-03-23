export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  ai_summary: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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
