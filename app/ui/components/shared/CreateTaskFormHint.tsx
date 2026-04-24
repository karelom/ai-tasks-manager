'use client';

import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';
import { useEffect, useState, useTransition } from 'react';
import { CreateTaskProps } from '@/ui/components/shared/CreateTaskForm';
import { fetchActiveProject } from '@/lib/actionsProject';

export default function CreateTaskFormHint({ projectId }: CreateTaskProps) {
  const [projectName, setProjectName] = useState('');
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      if (projectId) {
        getProjectName(projectId).then((name) => setProjectName(name));
      }
    });
  }, [projectId]);

  return (
    <div className="text-slate-400">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        projectName && (
          <i className="text-sm font-light">
            Project Name: [ <span className="font-bold">{projectName}</span> ]
          </i>
        )
      )}
    </div>
  );
}

async function getProjectName(projectId: string) {
  const projectResult = await fetchActiveProject(projectId);
  if (projectResult.ok && projectResult.data) {
    return projectResult.data.name;
  }
  return '';
}
