import { Task } from '@/lib/definitions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const task: Task[] = [];

  if (!task) {
    notFound(); // Triggers your 404 page if the ID doesn't exist
    return;
  }

  // return (
  //   <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
  //     <div className="mb-6">
  //       <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">
  //         Task Detail
  //       </span>
  //       <h1 className="text-3xl font-bold text-slate-900 mt-2">{task.title}</h1>
  //     </div>

  //     <div className="prose prose-slate">
  //       <p className="text-slate-600 leading-relaxed">
  //         {task.description || 'No detailed description provided for this AI task.'}
  //       </p>
  //     </div>

  //     <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
  //       <div className="text-sm text-slate-400">ID: {id}</div>
  //       <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800">
  //         Mark as Done
  //       </button>
  //     </div>
  //   </div>
  // );
}
