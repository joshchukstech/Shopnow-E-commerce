import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, Search } from 'lucide-react';
import { ProductCard } from '@/src/components/shop/ProductCard';
import { useProducts } from '@/src/hooks/useProducts';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports',
  'Books',
];

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products, loading } = useProducts();

  // Filters state
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';
  const sortOption = searchParams.get('sort') || 'popular';
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Derived state
  const filteredProducts = useMemo(() => {
    let result = products;

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => {
      const discountedPrice = p.price - (p.price * p.discount) / 100;
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    });

    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => (a.price - (a.price * a.discount) / 100) - (b.price - (b.price * b.discount) / 100));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price - (b.price * b.discount) / 100) - (a.price - (a.price * a.discount) / 100));
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [products, categoryFilter, searchQuery, priceRange, sortOption]);

  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };

  const updateCategory = (cat: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat) {
      newParams.set('category', cat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {categoryFilter ? categoryFilter : searchQuery ? `Search: ${searchQuery}` : 'All Products'}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {loading ? 'Loading...' : `Showing ${filteredProducts.length} results`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
            <select
              value={sortOption}
              onChange={updateSort}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="popular">Popularity</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Filters */}
        <aside
          className={`
            ${isFilterOpen ? 'block' : 'hidden'} 
            w-full shrink-0 space-y-8 md:block md:w-64
          `}
        >
          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => updateCategory(null)}
                  className={`text-sm ${!categoryFilter ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => updateCategory(cat)}
                    className={`text-sm ${categoryFilter === cat ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Price Range
            </h3>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full"
                placeholder="Min"
              />
              <span className="text-slate-500">-</span>
              <Input
                type="number"
                min="0"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
                placeholder="Max"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 mb-4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-6 dark:bg-slate-900">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">No products found</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchParams({});
                  setPriceRange([0, 1000]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
