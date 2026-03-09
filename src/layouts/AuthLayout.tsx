import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@/src/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans">
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Shopnow
        </Link>
        <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
