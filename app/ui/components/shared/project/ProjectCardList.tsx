import { fetchProjects } from '@/lib/actionsProject';
import { notFound } from 'next/navigation';
import { VirtualListType } from '@/lib/definitions';
import VirtualList from '@/ui/components/shared/VirtualList';

export default async function ProjectCardList() {
  const result = await fetchProjects();
  if (!result.ok) notFound();

  return <VirtualList type={VirtualListType.PROJECT} items={result.data!} />;
}
