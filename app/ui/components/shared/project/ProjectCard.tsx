import { Project } from '@/lib/definitions';
import Link from 'next/link';

interface ProjectCardProps {
  data: Project;
}
export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Link
      key={data.id}
      href={`/project/${data.id}`}
      className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition flex justify-between items-center gap-8 group"
    >
      <div>
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">{data.name}</h3>
        <p className="text-xs text-slate-400">{new Date(data.createdAt).toLocaleString('zh-tw')}</p>
      </div>
    </Link>
  );
}
