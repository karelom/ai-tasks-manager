import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { fetchActiveProject } from '@/lib/actionsProject';
import ProjectHeader from '@/ui/components/shared/project/ProjectHeader';
import ProgressBar from '@/ui/components/shared/project/ProgressBar';
import { fetchProjectTasks } from '@/lib/actionsTask';
import TaskCardList from '@/ui/components/shared/TaskCardList';
import CreateTaskButton from '@/ui/components/shared/CreateTaskButton';

interface ProjectCardDetailProps {
  id: string;
}

export default async function ProjectCardDetail({ id }: ProjectCardDetailProps) {
  const [projectResult, tasksResult] = await Promise.all([
    fetchActiveProject(id),
    fetchProjectTasks(id),
  ]);
  if (!projectResult.ok || !projectResult.data || !tasksResult.ok) {
    notFound();
    return;
  }

  const project = projectResult.data!;
  const tasks = tasksResult.data!;
  return (
    <>
      <ProjectCardDetailLayout
        header={<ProjectHeader name={project.name} />}
        progressBar={<ProgressBar tasks={tasks} />}
        taskCardList={<TaskCardList payload={tasks} backRoute={`/project/${id}`} />}
      />

      <CreateTaskButton projectId={id} />
    </>
  );
}

interface ProjectCardDetailLayoutProps {
  header: ReactNode;
  progressBar: ReactNode;
  taskCardList: ReactNode;
}
export function ProjectCardDetailLayout({
  header,
  progressBar,
  taskCardList,
}: ProjectCardDetailLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-8">
      <div className="md:col-span-2 space-y-6">
        {header}

        {progressBar}

        {taskCardList}
      </div>

      <div className="flex flex-col gap-5">
        {/* <div className="grid md:grid-cols-1 grid-cols-2 bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
            {status}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Priority</label>
            {priority}
          </div>

          {dueDate}
        </div> */}

        <div className="grid grid-cols-1 bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase">Settings</label>
          {/* {deleteBtn} */}
        </div>
      </div>
    </div>
  );
}
