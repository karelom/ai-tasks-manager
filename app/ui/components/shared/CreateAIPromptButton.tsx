'use client';

import breakDownTask, { type BreakDownTaskOptions } from '@/api/ai/breakdown';
import { useState, useTransition } from 'react';
import AIPromptInput from '@/ui/components/shared/aiPrompt/AIPromptInput';
import { AddTaskType } from '@/lib/schemas';
import AIPlanPreview from '@/ui/components/shared/aiPrompt/AIPlanPreview';

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
      return;
    });
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
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
      />
    </div>
  );
}
