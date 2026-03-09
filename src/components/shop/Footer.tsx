import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 block">
              Shopnow
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
              Discover the finest curated products for your modern lifestyle. Quality, design, and sustainability in every piece.
            </p>
            <div className="flex gap-2 max-w-md">
              <Input type="email" placeholder="Enter your email" className="bg-white dark:bg-slate-900" />
              <Button>Subscribe</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Electronics" className="hover:text-slate-900 dark:hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/shop?category=Clothing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/shop?category=Home" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home & Kitchen</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-slate-900 dark:hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Shopnow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
