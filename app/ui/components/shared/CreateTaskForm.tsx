'use client';

import { createTask } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export interface CreateTaskProps {
  projectId?: string;
  parentId?: string;
}

export default function CreateTaskForm({ projectId, parentId }: CreateTaskProps) {
  const { pending } = useFormStatus();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await createTask(formData);

    if (result.ok) {
      router.back();
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 mb-8">
      <div className="flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="What needs to be done?"
          required
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input type="hidden" name="projectId" value={projectId || ''} />

        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
        >
          {pending ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {/* You can display Zod errors here if needed */}
    </form>
  );
}
