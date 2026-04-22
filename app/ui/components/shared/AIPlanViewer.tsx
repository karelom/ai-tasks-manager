import { Button } from '@/components/ui/button';
import { AddTaskType } from '@/lib/schemas';

type Props = {
  steps: AddTaskType[];
  refineText: string;
  setRefineText: (v: string) => void;
  onRefine: () => void;
  onRegenerate: () => void;
  isLoading: boolean;
};

export default function AIPlanViewer({
  steps,
  refineText,
  setRefineText,
  onRefine,
  onRegenerate,
  isLoading,
}: Props) {
  if (!steps.length) return null;

  return (
    <div className="border rounded p-4 space-y-4">
      <h2 className="text-sm text-gray-500">
        {refineText ? `Refined: ${refineText}` : 'Base Plan'}
      </h2>

      <StepList steps={steps} />

      <div className="space-y-2">
        <input
          value={refineText}
          onChange={(e) => setRefineText(e.target.value)}
          placeholder="Refine... e.g. focus on speaking"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <Button
            onClick={onRefine}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Refine
          </Button>

          <Button
            onClick={onRegenerate}
            disabled={isLoading}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg cursor-pointer"
          >
            Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: AddTaskType[] }) {
  return (
    <div className="space-y-2">
      {steps.map((step, idx) => (
        <div key={idx} className="border p-2 rounded">
          <div className="font-semibold">
            {idx + 1}. {step.title}
          </div>
          {step.description && <div className="text-sm text-gray-600">{step.description}</div>}

          <div className="text-xs mt-1 text-gray-500">
            {step.status} | {step.priority}
          </div>
        </div>
      ))}
    </div>
  );
}
