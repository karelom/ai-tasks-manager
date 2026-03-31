'use client';

import CreateTaskForm from '@/ui/components/shared/CreateTaskForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>loading form ...</div>}>
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const parentId = searchParams.get('parentId');

  return <CreateTaskForm projectId={projectId} parentId={parentId} />;
}
