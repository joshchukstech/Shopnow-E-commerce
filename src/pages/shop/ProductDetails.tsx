import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { products } from '@/src/data/mockData';
import { Button } from '@/src/components/ui/Button';
import { useCart } from '@/src/context/CartContext';
import { useWishlist } from '@/src/context/WishlistContext';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
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
    }, quantity);
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    if (isWishlisted) {
      toast.info('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-slate-900 dark:hover:text-white">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-slate-900 dark:hover:text-white">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-slate-200 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
            {product.discount > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                -{product.discount}%
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className="aspect-square overflow-hidden rounded-lg border-2 border-transparent bg-slate-100 hover:border-indigo-500 dark:bg-slate-900">
                <img
                  src={`${product.image}?random=${i}`}
                  alt={`${product.name} view ${i}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {product.category}
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {product.name}
          </h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-800 dark:text-slate-800'}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.rating} Rating</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">({product.reviews} reviews)</span>
          </div>

          <div className="mb-6 flex items-end gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xl text-slate-500 line-through dark:text-slate-400">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mb-8 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          {/* Actions */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex h-12 w-32 items-center justify-between rounded-md border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-medium text-slate-900 dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            
            <Button size="icon" variant="outline" className="h-12 w-12 shrink-0" onClick={handleWishlist}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/50 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
