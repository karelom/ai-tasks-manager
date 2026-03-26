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
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <Header />

        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-8 bg-slate-50/50 min-h-screen">
            {children}
            {modal}
          </main>
        </div>
      </div>
    </div>
  );
}
