'use client';

import breakDownTask, { type BreakDownTaskOptions } from '@/api/ai/breakdown';
import { useState, useTransition } from 'react';
import AIPromptInput from '@/ui/components/shared/AIPromptInput';
import AIPlanViewer from '@/ui/components/shared/AIPlanViewer';
import { AddTaskType } from '@/lib/schemas';

type GeneratePlanOptions = Partial<Omit<BreakDownTaskOptions, 'input'>>;

export default function CreateAIPromptButton() {
  const [input, setInput] = useState('');
  const [isLoading, startTransition] = useTransition();
  const [steps, setSteps] = useState<AddTaskType[]>([]);
  const [refineText, setRefineText] = useState('');

  async function generatePlan({ refinementContext = '', forceNew = false }: GeneratePlanOptions) {
    console.log({ forceNew });
    if (!input) return;

    startTransition(async () => {
      const result = await breakDownTask({ input, refinementContext, forceNew });
      if (result.ok) {
        setSteps(result.data);
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

      <AIPlanViewer
        steps={steps}
        refineText={refineText}
        setRefineText={setRefineText}
        onRefine={() => generatePlan({ refinementContext: refineText })}
        onRegenerate={() => generatePlan({ forceNew: true })}
        isLoading={isLoading}
      />
    </div>
  );
}
