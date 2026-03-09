import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Moon, Sun, Heart, LogOut } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { useTheme } from '@/src/context/ThemeContext';
import { useAuth } from '@/src/context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useState } from 'react';

export function Navbar() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-600 dark:text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shopnow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-slate-900 dark:hover:text-white transition-colors">Categories</Link>
            {isAdmin && (
              <Link to="/admin" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="pl-9 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link to="/wishlist" className="hidden sm:flex p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              <Heart className="h-5 w-5" />
            </Link>

            {user ? (
              <div className="group relative hidden sm:flex items-center gap-2 cursor-pointer p-2">
                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
                <div className="absolute right-0 top-full mt-2 hidden w-48 flex-col rounded-md border border-slate-200 bg-white p-2 shadow-lg group-hover:flex dark:border-slate-800 dark:bg-slate-950">
                  <div className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-2">
                    {user.email}
                  </div>
                  <Link to="/profile" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-md">Profile</Link>
                  <Link to="/orders" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-md">Orders</Link>
                  <button onClick={() => logout()} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md text-left">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white dark:bg-white dark:text-slate-900">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <nav className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/categories" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to="/wishlist" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
              {isAdmin && (
                <Link to="/admin" className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              {!user ? (
                <Link to="/login" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
              ) : (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="p-2 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md">
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
