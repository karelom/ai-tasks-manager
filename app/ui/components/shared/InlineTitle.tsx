'use client';

import { useEffect, useRef, useState } from 'react';
import { updateTask } from '@/lib/actions'; // You'll need this server action
import clsx from 'clsx';

export function InlineTitle({ taskId, data }: { taskId: string; data: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleClick = () => setIsEditing(true);

  const handleBlur = async () => {
    setIsEditing(false);

    if (title === data) return;
    setIsSaving(true);

    const result = await updateTask(taskId, { title });
    if (!result?.ok) {
      setTitle(data);
      setIsEditing(true);
    }

    setIsSaving(false);
  };

  if (isEditing || isSaving) {
    return (
      <div className="relative group w-full">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          className={clsx(
            'w-full text-3xl font-bold bg-transparent border-none outline-none rounded-md px-1 -ml-1 transition-all',
            'hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-100',
            isSaving ? 'opacity-50 cursor-wait' : 'text-slate-900'
          )}
          placeholder="Task title..."
          disabled={isSaving}
        />
        {isSaving && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 cursor-wait animate-pulse">
            Saving...
          </span>
        )}
      </div>
    );
  }

  return (
    <h1
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="text-3xl font-bold text-slate-900 cursor-text hover:bg-slate-100 rounded-lg px-2 -ml-2 transition-colors"
      tabIndex={0}
    >
      {title}
    </h1>
  );
}
