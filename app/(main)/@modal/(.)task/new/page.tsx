'use client';

import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CreateTaskForm, { CreateTaskProps } from '@/ui/components/shared/CreateTaskForm';
import { useEffect } from 'react';

export default function Page({ projectId, parentId }: CreateTaskProps) {
  const router = useRouter();

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
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Create New Task</h2>
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* The Form (Reused from your full-page route) */}
        <div className="p-6">
          <CreateTaskForm projectId={projectId} parentId={parentId} />
        </div>
      </div>
    </div>
  );
}
