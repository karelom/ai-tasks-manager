import EditableTaskList from '@/ui/components/shared/aiPrompt/EditableTaskList';
import PlanActions, { PlanActionsProps } from '@/ui/components/shared/aiPrompt/PlanActions';
import { AddTaskType } from '@/lib/schemas';

type AIPlanPreviewProps = {
  setTasks: (tasks: AddTaskType[]) => void;
} & PlanActionsProps;

export default function AIPlanPreview({
  tasks,
  setTasks,
  isLoading,
  onRefine,
  onRegenerate,
  onCreateProject,
}: AIPlanPreviewProps) {
  return (
    <div className="border rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">AI Plan</h2>

      <EditableTaskList tasks={tasks} setTasks={setTasks} isLoading={isLoading} />

      <PlanActions
        tasks={tasks}
        isLoading={isLoading}
        onRefine={onRefine}
        onRegenerate={onRegenerate}
        onCreateProject={onCreateProject}
      />
    </div>
  );
}
