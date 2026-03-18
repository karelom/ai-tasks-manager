export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white">
      <h2 className="text-sm font-medium text-slate-500">AI Task Manager</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="text-sm border rounded-md px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
          D
        </div>
      </div>
    </header>
  );
}
