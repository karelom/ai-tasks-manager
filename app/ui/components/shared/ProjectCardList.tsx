import ProjectCard from '@/ui/components/shared/ProjectCard';
import { fetchProjects } from '@/lib/actionsProject';
import { notFound } from 'next/navigation';

export default async function ProjectCardList() {
  const result = await fetchProjects();
  if (!result.ok) {
    notFound();
    return;
  }

  const projects = result.data!;
  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  );
}
