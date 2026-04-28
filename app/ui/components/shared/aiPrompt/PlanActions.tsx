import { Button } from '@/components/ui/button';
import { AddTaskType } from '@/lib/schemas';
import { useState } from 'react';
import { GeneratePlanOptions } from '../CreateAIPromptButton';

export interface PlanActionsProps {
  tasks: AddTaskType[];
  isLoading: boolean;
  onRefine: (options: GeneratePlanOptions) => Promise<void>;
  onRegenerate: () => void;
}

export default function PlanActions({
  tasks,
  isLoading,
  onRefine,
  onRegenerate,
}: PlanActionsProps) {
  const [refineText, setRefineText] = useState('');

  function onCreateProject(tasks: AddTaskType[]) {
    // TODO: save project api
    console.log('onCreateProject', tasks);
  }

  return (
    tasks.length > 0 && (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <input
            value={refineText}
            onChange={(e) => setRefineText(e.target.value)}
            placeholder="Refine... e.g. focus on speaking"
            className="w-full border p-2 rounded"
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
          onClick={() => onCreateProject(tasks)}
          disabled={isLoading}
          className=" px-4 py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          Create Project
        </Button>
      </div>
    )
  );
}
