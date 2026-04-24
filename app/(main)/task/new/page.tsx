import CreateTaskForm, { CreateTaskProps } from '@/ui/components/shared/CreateTaskForm';
import { Suspense } from 'react';

type PageProps = {
  searchParams: Promise<CreateTaskProps>;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div>loading form ...</div>}>
      <MainContent searchParams={searchParams} />
    </Suspense>
  );
}

async function MainContent({ searchParams }: PageProps) {
  const { projectId, parentId } = await searchParams;
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-800 mb-8">Create New Task</h2>
      <CreateTaskForm projectId={projectId} parentId={parentId} />
    </>
  );
}
