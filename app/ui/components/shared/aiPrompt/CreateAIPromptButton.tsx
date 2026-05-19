'use client';

import breakDownTask, { type BreakDownTaskOptions } from '@/api/ai/breakdown';
import { useState, useTransition } from 'react';
import AIPromptInput from '@/ui/components/shared/aiPrompt/AIPromptInput';
import { AddTaskType, defaultAddProject, defaultAddTask } from '@/lib/schemas';
import AIPlanPreview from '@/ui/components/shared/aiPrompt/AIPlanPreview';
import { createProjectWithTasks } from '@/lib/actionsProject';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

export type GeneratePlanOptions = Partial<Omit<BreakDownTaskOptions, 'input'>>;
export type SortableTaskType = AddTaskType & { clientId: string };

export default function CreateAIPromptButton() {
  const [input, setInput] = useState('');
  const [isLoading, startTransition] = useTransition();
  const [tasks, setTasks] = useState<SortableTaskType[]>([]);
  const { isSignedIn, user } = useUser();

  async function generatePlan({ refinementContext = '', forceNew = false }: GeneratePlanOptions) {
    if (!input) return;

    startTransition(async () => {
      const result = await breakDownTask({ input, refinementContext, forceNew });
      if (result.ok) {
        setTasks(
          result.data.map((task: AddTaskType) => ({
            ...task,
            clientId: crypto.randomUUID(),
          }))
        );
      }
    });
  }

  async function createProject() {
    startTransition(async () => {
      const projectPayload = { ...defaultAddProject, name: input };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tasksPayload = tasks.map(({ clientId, ...task }) => ({ ...defaultAddTask, ...task }));
      const result = await createProjectWithTasks(projectPayload, tasksPayload);
      if (result.ok) {
        toast.success('Successfully create project and tasks.');
      } else {
        toast.error('Failed to create project or corresponding tasks.');
      }
    });
  }

  return !isSignedIn ? (
    <div className="p-3">
      Please <b>sign in</b> to activate feature.
    </div>
  ) : !user?.publicMetadata.enableAIPrompt ? (
    <div className="p-3">
      Your account does not has authorization to access the following feature: [
      <b>AI Generating Plan</b>
      ].
      <br />
      Please contact the admin, thanks for your patience.
    </div>
  ) : (
    <div className="md:p-6 max-w-5xl mx-auto space-y-4">
      <AIPromptInput
        input={input}
        setInput={setInput}
        onGenerate={() => generatePlan({})}
        isLoading={isLoading}
      />

      <AIPlanPreview
        tasks={tasks}
        setTasks={setTasks}
        isLoading={isLoading}
        onRefine={generatePlan}
        onRegenerate={() => generatePlan({ forceNew: true })}
        onCreateProject={createProject}
      />
    </div>
  );
}
