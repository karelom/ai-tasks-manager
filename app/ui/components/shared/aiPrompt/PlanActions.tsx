import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  SortableTaskType,
  GeneratePlanOptions,
} from '@/ui/components/shared/aiPrompt/CreateAIPromptButton';

export interface PlanActionsProps {
  tasks: SortableTaskType[];
  isLoading: boolean;
  onRefine: (options: GeneratePlanOptions) => Promise<void>;
  onRegenerate: () => void;
  onCreateProject: () => void;
}

export default function PlanActions({
  tasks,
  isLoading,
  onRefine,
  onRegenerate,
  onCreateProject,
}: PlanActionsProps) {
  const [refineText, setRefineText] = useState('');

  return (
    tasks.length > 0 && (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <input
            value={refineText}
            disabled={isLoading}
            onChange={(e) => setRefineText(e.target.value)}
            placeholder="Refine... e.g. focus on speaking"
            className="w-full border p-2 rounded disabled:opacity-50"
          />

          <Button
            onClick={() => onRefine({ refinementContext: refineText })}
            disabled={isLoading}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg cursor-pointer"
          >
            Refine
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <p>Don&apos;t like the responses? Try again.</p>
          <Button
            onClick={onRegenerate}
            disabled={isLoading}
            className="px-3 py-1 bg-black text-white rounded-lg cursor-pointer"
          >
            Regenerate
          </Button>
        </div>

        <Button
          onClick={onCreateProject}
          disabled={isLoading}
          className=" px-4 py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          Create Project
        </Button>
      </div>
    )
  );
}
