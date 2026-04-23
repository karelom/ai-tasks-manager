export interface Project {
  id: string;
  name: string;
  description: string;
  colorCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Task {
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
  dueAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

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

export interface TaskPlanGroup {
  id: string;
  normalizedInput: string;
  createdAt: Date;
}

export interface TaskPlanVariantDTO {
  id: string;
  groupId: string | null;
  input: string;
  refinementContext: string | null;
  steps: string; // JSON
  isBase: boolean;
  createdAt: Date;
}

export interface TaskPlanVariant extends Omit<TaskPlanVariantDTO, 'steps'> {
  steps: Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueAt'>[];
}

export type ResponseState<T = unknown> = Promise<{
  ok: boolean;
  data?: T;
  error?: string;
}>;
