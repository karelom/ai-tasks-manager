import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

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

        <div className="flex justify-end items-center p-4 gap-4 h-16">
          <Show when="signed-out">
            <SignInButton>
              <button className="cursor-pointer">Sign in</button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
        {/* <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
          D
        </div> */}
      </div>
    </header>
  );
}
