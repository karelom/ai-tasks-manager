'use client';

import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';
import { updateTask } from '@/lib/actions';
import clsx from 'clsx';
import { BubbleMenu } from '@tiptap/react/menus';

export function InlineDescription({ taskId, data }: { taskId: string; data: string }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [invalid, setInvalid] = useState<string | null>(null);

  // #region [ TipTap configurations ]

  const editor = useEditor({
    extensions: [StarterKit],
    content: data,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-pink focus:outline-none max-w-none min-h-[100px]',
      },
      handleKeyDown: (view, e) => {
        switch (e.key) {
          case 'Enter':
            if (!e.shiftKey) {
              view.dom.blur();
              return true;
            }
            return false;
          case 'Escape':
            editor?.commands.setContent(data);
            view.dom.blur();
            return true;
          default:
            return false;
        }
      },
    },
    onBlur: async ({ editor }) => {
      setInvalid(null);

      const description = editor.getHTML();
      if (description === data) {
        setIsEditing(false);
        return;
      }

      setIsSaving(true);

      const result = await updateTask(taskId, { description });
      if (result?.ok) {
        setIsEditing(false);
      } else {
        setInvalid(result.error ?? 'Failed to save');
        editor.commands.setContent(data);
        editor?.commands.focus();
      }

      setIsSaving(false);
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      return {
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isBulletList: editor.isActive('bulletList'),
      };
    },
  });

  // #endregion

  // #region [ Hook methods ]

  // Keep editor content in sync if data changes externally
  useEffect(() => {
    if (editor && data !== editor.getHTML()) {
      editor.commands.setContent(data);
    }
  }, [data, editor]);

  // #endregion

  return (
    <div
      className={clsx(
        'relative w-full p-2 rounded-lg transition-all border',
        isEditing
          ? 'bg-white border-blue-100 shadow-sm ring-2 ring-blue-100'
          : 'bg-transparent border-transparent hover:bg-slate-100 cursor-text',
        isSaving && 'opacity-50 cursor-wait'
      )}
      onClick={() => {
        setIsEditing(true);
        editor?.commands.focus();
      }}
    >
      {editor && (
        <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8, flip: true }}>
          <div className="flex items-center gap-1 bg-white border border-slate-200 shadow-xl rounded-lg p-1.5 animate-in fade-in zoom-in-95 duration-200">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={clsx(
                'p-1.5 rounded transition-colors text-xs font-bold',
                editorState?.isBold
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-slate-100 text-slate-600'
              )}
            >
              B
            </button>
            <div className="w-px h-4 bg-slate-200 mx-1" /> {/* Divider */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={clsx(
                'p-1.5 rounded transition-colors text-xs',
                editorState?.isBulletList
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-slate-100 text-slate-600'
              )}
            >
              List
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      {!isEditing && !editor?.getText() && (
        <span className="text-slate-400 italic absolute top-2 left-2 pointer-events-none">
          Add a description...
        </span>
      )}

      {invalid && (
        <div className="absolute -bottom-5 left-0 text-xs font-medium text-red-500 animate-in slide-in-from-top-1 duration-200">
          {invalid}
        </div>
      )}

      {isSaving && (
        <div className="absolute bottom-2 right-2 text-xs text-slate-400 animate-pulse">
          Saving...
        </div>
      )}
    </div>
  );
}
