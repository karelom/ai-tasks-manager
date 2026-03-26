import CreateTaskForm from '@/ui/components/shared/CreateTaskForm';

export interface CreateTaskProps {
  projectId?: string;
  parentId?: string;
}

export default function Page({ projectId, parentId }: CreateTaskProps) {
  return <CreateTaskForm projectId={projectId} parentId={parentId} />;
}
