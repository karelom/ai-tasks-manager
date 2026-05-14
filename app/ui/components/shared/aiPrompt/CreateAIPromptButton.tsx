'use client';

import breakDownTask, { type BreakDownTaskOptions } from '@/api/ai/breakdown';
import { useState, useTransition } from 'react';
import AIPromptInput from '@/ui/components/shared/aiPrompt/AIPromptInput';
import { AddTaskType, defaultAddProject, defaultAddTask } from '@/lib/schemas';
import AIPlanPreview from '@/ui/components/shared/aiPrompt/AIPlanPreview';
import { createProjectWithTasks } from '@/lib/actionsProject';
import { toast } from 'sonner';

export type GeneratePlanOptions = Partial<Omit<BreakDownTaskOptions, 'input'>>;

export default function CreateAIPromptButton() {
  const [input, setInput] = useState('');
  const [isLoading, startTransition] = useTransition();
  const [tasks, setTasks] = useState<AddTaskType[]>([]);

  async function generatePlan({ refinementContext = '', forceNew = false }: GeneratePlanOptions) {
    if (!input) return;

    startTransition(async () => {
      const result = await breakDownTask({ input, refinementContext, forceNew });
      if (result.ok) {
        setTasks(result.data);
      }
    });
  }

  async function createProject() {
    startTransition(async () => {
      const projectPayload = { ...defaultAddProject, name: input };
      const tasksPayload = tasks.map((task) => ({ ...defaultAddTask, ...task }));
      const result = await createProjectWithTasks(projectPayload, tasksPayload);
      if (result.ok) {
        toast.success('Successfully create project and tasks.');
      } else {
        toast.error('Failed to create project or corresponding tasks.');
      }
    });
  }

  return (
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
