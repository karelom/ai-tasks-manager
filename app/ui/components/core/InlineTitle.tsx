'use client';

import { useEffect, useRef, useState } from 'react';
import { updateTask } from '@/lib/actionsTask';
import clsx from 'clsx';
import { AddTaskSchema } from '@/lib/schemas';
import HintSavingLabel from '@/ui/components/shared/HintSavingLabel';
import HintInvalidLabel from '@/ui/components/shared/HintInvalidLabel';

export function InlineTitle({ taskId, data }: { taskId: string; data: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [invalid, setInvalid] = useState<string>('');

  // #region [ static methods ]

  function inputRefFocus() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  function setInvalidState(msg: string) {
    setInvalid(msg);
    setTitle(data);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inputRefFocus();
      });
    });
  }

  // #endregion

  // #region [ React Hook ]

  useEffect(() => {
    if (isEditing) {
      inputRefFocus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (invalid) {
      const timer = setTimeout(() => setInvalid(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [invalid]);

  // #endregion

  // #region [ DOM event handlers ]

  const handleClick = () => setIsEditing(true);

  const handleBlur = async () => {
    setInvalid('');

    if (title === data) {
      setIsEditing(false);
      return;
    }

    const validation = AddTaskSchema.pick({ title: true }).safeParse({ title });
    if (!validation.success) {
      setInvalidState(validation.error.issues[0].message);
      return;
    }

    setIsSaving(true);

    const result = await updateTask(taskId, { title });
    if (result?.ok) {
      setIsEditing(false);
    } else {
      setInvalidState(result.error ?? 'Failed to save');
    }

    setIsSaving(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.currentTarget.blur();
        break;
      case 'Escape':
        setTitle(data);
        setInvalid('');
        setIsEditing(false);
        break;
    }
  };

  // #endregion

  // #region [ DOM ]

  if (isEditing || isSaving) {
    return (
      <div className="relative group w-full">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={clsx(
            'w-full text-3xl font-bold bg-transparent border-none outline-none rounded-md px-1 -ml-1 shadow-sm transition-all',
            'hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-100',
            isSaving ? 'opacity-50 cursor-wait' : 'text-slate-900'
          )}
          placeholder="Task title..."
          disabled={isSaving}
        />

        <HintInvalidLabel data={invalid} />
        <HintSavingLabel enable={isSaving} />
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

  // #endregion
}
