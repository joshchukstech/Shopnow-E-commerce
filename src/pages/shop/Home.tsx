import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { ProductCard } from '@/src/components/shop/ProductCard';
import { useProducts } from '@/src/hooks/useProducts';
import { motion } from 'motion/react';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports',
  'Books',
];

export function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-slate-900 dark:bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/hero/1920/1080?blur=2"
            alt="Hero Background"
            className="h-full w-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent dark:from-black dark:via-black/40" />
        </div>

        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
              New Collection 2024
            </span>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Elevate Your Everyday Style.
            </h1>
            <p className="mb-8 text-lg text-slate-300 sm:text-xl">
              Discover our curated collection of premium products designed for modern living. Quality meets aesthetics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-white text-slate-900 hover:bg-slate-100 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                <Link to="/shop">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                <Link to="/categories">Explore Categories</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="mb-4 rounded-full bg-indigo-50 p-4 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Free Shipping</h3>
            <p className="text-slate-600 dark:text-slate-400">On all orders over $100. Fast and reliable delivery worldwide.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="mb-4 rounded-full bg-emerald-50 p-4 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Secure Payment</h3>
            <p className="text-slate-600 dark:text-slate-400">100% secure payment processing. Your data is protected.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="mb-4 rounded-full bg-amber-50 p-4 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
              <RefreshCcw className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Easy Returns</h3>
            <p className="text-slate-600 dark:text-slate-400">30-day return policy for a full refund. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Shop by Category</h2>
          <Link to="/categories" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <img
                src={`https://picsum.photos/seed/${category.replace(/\s+/g, '').toLowerCase()}/400/400`}
                alt={category}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/40 transition-colors group-hover:bg-slate-900/50" />
              <span className="relative z-10 text-lg font-bold text-white tracking-wide">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No products available yet. Add some from the admin panel!</p>
            <Button asChild className="mt-4">
              <Link to="/admin/products">Add Products</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon fill="currentColor" points="0,100 100,0 100,100" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Summer Sale is Here!
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-indigo-100">
              Get up to 50% off on selected items. Upgrade your wardrobe and home with our exclusive summer collection.
            </p>
            <Button size="lg" asChild className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link to="/shop?sale=true">Shop the Sale</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 flex-1 text-slate-600 dark:text-slate-400 italic">
                "Absolutely love the quality of the products. The customer service was exceptional and shipping was incredibly fast. Will definitely be ordering again!"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="Customer"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
