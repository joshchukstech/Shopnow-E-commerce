import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Button } from '@/src/components/ui/Button';

export function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = items.length > 0 ? (totalPrice > 100 ? 0 : 15) : 0;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
          <ShoppingBag className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button size="lg" asChild>
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover bg-slate-100 dark:bg-slate-900"
                />
                <div className="flex flex-1 flex-col">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                    {item.name}
                  </Link>
                  <span className="mt-1 font-bold text-slate-900 dark:text-slate-50">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                  <div className="flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-2 dark:border-slate-800 dark:bg-slate-900">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-md p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sticky top-24">
            <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              
              <div className="my-4 border-t border-slate-200 dark:border-slate-700"></div>
              
              <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="mt-8 w-full" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
