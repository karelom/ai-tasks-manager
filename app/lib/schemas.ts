import z from 'zod';
import { TaskPriority, TaskStatus } from './definitions';

export const AddTaskSchema = z.object({
  projectId: z.string().nullable(),
  parentId: z.string().nullable(),
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  dueAt: z.date().nullable(),
});
export const defaultAddTask = {
  projectId: null,
  parentId: null,
  title: '',
  description: '',
  status: TaskStatus.BACKLOG,
  priority: TaskPriority.NONE,
  dueAt: null,
};

export type AddTaskType = z.infer<typeof AddTaskSchema>;
export type AddTaskErrors = ReturnType<typeof z.treeifyError<AddTaskType>>['properties'];

export function isInvalidDate(date: unknown) {
  return !date || (date instanceof Date && isNaN(date.getTime()));
}
