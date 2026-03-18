'use client';

import {
  AdjustmentsHorizontalIcon,
  HomeIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'All Tasks',
    href: '/all-task',
    icon: RectangleStackIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen flex flex-col">
      <div className="p-6 font-bold text-xl tracking-tight text-slate-900">Brain.ai</div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('flex h-12 p-4 grow items-center justify-start gap-2 rounded-lg ', {
                'bg-blue-100 text-blue-700 font-medium': pathName === link.href,
                'text-slate-600 hover:bg-slate-200 transition': pathName !== link.href,
              })}
            >
              <LinkIcon className="w-6" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200 text-xs text-slate-400 text-center">
        v1.0.0-beta
      </div>
    </aside>
  );
}
