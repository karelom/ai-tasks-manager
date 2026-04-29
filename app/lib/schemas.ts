import z from 'zod';
import { TaskPriority, TaskStatus } from './definitions';

export const AddProjectSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().nullable(),
  colorCode: z.string().nullable(),
});
export const defaultAddProject = {
  name: '',
  description: '',
  colorCode: null,
};
export type AddProjectType = z.infer<typeof AddProjectSchema>;
export type AddProjectErrors = ReturnType<typeof z.treeifyError<AddProjectType>>['properties'];

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
