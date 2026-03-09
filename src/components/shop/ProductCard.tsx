import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '@/src/context/CartContext';
import { useWishlist } from '@/src/context/WishlistContext';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
    rating: number;
    reviews: number;
    category: string;
    image: string;
    isNew?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    if (isInWishlist(product.id)) {
      toast.info('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-all hover:shadow-lg dark:hover:shadow-slate-900/50">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount > 0 && (
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-2 text-slate-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-400"
      >
        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{product.category}</p>
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-slate-900 dark:text-slate-100">
          {product.name}
        </h3>
        
        <div className="mb-4 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-50">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-slate-500 line-through dark:text-slate-400">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button size="icon" onClick={handleAddToCart} className="h-8 w-8 rounded-full">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
