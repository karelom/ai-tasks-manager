import { Toaster } from '@/components/ui/sonner';
import Header from '@/ui/components/core/Header';
import Sidebar from '@/ui/components/core/Sidebar';
import React from 'react';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-screen flex-1 flex flex-col relative">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 md:mb-0 mb-16 p-8 bg-slate-50/50 overflow-y-auto">
            {children}
            {modal}
          </main>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
