'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import CreateTaskForm from '@/ui/components/shared/CreateTaskForm';
import { Suspense, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CreateTaskFormHint from '@/ui/components/shared/CreateTaskFormHint';

export default function Page() {
  return (
    <Suspense fallback={<div>loading form ...</div>}>
      <ModalContent />
    </Suspense>
  );
}

function ModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const parentId = searchParams.get('parentId');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* 1. The Backdrop Click Area */}
      <div className="absolute inset-0" onClick={() => router.back()} />

      {/* 2. The Modal Content */}
      <div
        className={clsx(
          'relative  bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200',
          'w-9/10 max-w-3xl'
        )}
      >
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-semibold text-slate-800">Create New Task</h2>
            <Button
              onClick={() => router.back()}
              className="px-2 bg-transparent hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6 text-slate-500" />
            </Button>
          </div>

          <CreateTaskFormHint projectId={projectId} />
        </div>

        <div className="p-6">
          <CreateTaskForm projectId={projectId} parentId={parentId} />
        </div>
      </div>
    </div>
  );
}
