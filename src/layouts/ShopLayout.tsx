import { Outlet } from 'react-router-dom';
import { Navbar } from '@/src/components/shop/Navbar';
import { Footer } from '@/src/components/shop/Footer';

export function ShopLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
