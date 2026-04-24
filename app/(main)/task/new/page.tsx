import CreateTaskForm, { CreateTaskProps } from '@/ui/components/shared/CreateTaskForm';
import CreateTaskFormHint from '@/ui/components/shared/CreateTaskFormHint';
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 ">Create New Task</h2>
        <CreateTaskFormHint projectId={projectId} />
      </div>

      <CreateTaskForm projectId={projectId} parentId={parentId} />
    </>
  );
}
