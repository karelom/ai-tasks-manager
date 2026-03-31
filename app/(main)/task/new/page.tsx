'use client';

import CreateTaskForm from '@/ui/components/shared/CreateTaskForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const parentId = searchParams.get('parentId');

  return (
    <Suspense fallback={<div>loading form ...</div>}>
      <CreateTaskForm projectId={projectId} parentId={parentId} />
    </Suspense>
  );
}
