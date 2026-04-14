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
    <>
      <aside className="hidden md:flex w-64 bg-slate-50 border-r border-slate-200 h-screen flex-col sticky top-0">
        <div className="m-6 font-bold text-xl tracking-tight text-slate-900 border-b">
          Brain.ai
          <span className="p-4 border-slate-200 text-xs text-slate-400 text-center">
            v1.0.0-beta
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathName === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-12 p-4 items-center gap-2 rounded-lg transition-all',
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-200'
                )}
              >
                <LinkIcon className="w-6" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 h-16 flex items-center justify-around shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathName === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex flex-col items-center gap-1 transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-500'
              )}
            >
              <LinkIcon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
