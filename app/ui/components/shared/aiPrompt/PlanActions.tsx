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
    <div className="flex justify-between">
      <div className="space-y-2">
        <input
          value={refineText}
          onChange={(e) => setRefineText(e.target.value)}
          placeholder="Refine... e.g. focus on speaking"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <Button
            onClick={() => onRefine({ refinementContext: refineText })}
            disabled={isLoading}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg cursor-pointer"
          >
            Refine
          </Button>

          <Button
            onClick={onRegenerate}
            disabled={isLoading}
            className="px-3 py-1 bg-black text-white rounded-lg cursor-pointer"
          >
            Regenerate
          </Button>
        </div>
      </div>

      <Button
        onClick={() => onCreateProject(tasks)}
        disabled={isLoading}
        className=" px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
      >
        Create Project
      </Button>
    </div>
  );
}
