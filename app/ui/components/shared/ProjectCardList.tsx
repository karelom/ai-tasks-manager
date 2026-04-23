import ProjectCard from '@/ui/components/shared/ProjectCard';
import { fetchProjects } from '@/lib/actionsProject';

export default async function ProjectCardList() {
  const projects = await fetchProjects();

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  );
}
