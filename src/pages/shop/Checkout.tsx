import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { toast } from 'sonner';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = items.length > 0 ? (totalPrice > 100 ? 0 : 15) : 0;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success');
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                  <Input required placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                  <Input required placeholder="Doe" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input required type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <Input required type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Truck className="h-5 w-5" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Street Address</label>
                  <Input required placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                  <Input required placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State / Province</label>
                  <Input required placeholder="NY" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Postal Code</label>
                  <Input required placeholder="10001" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
                  <select className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-50">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <CreditCard className="h-5 w-5" /> Payment Method
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20">
                  <input type="radio" id="card" name="payment" defaultChecked className="h-4 w-4 text-indigo-600" />
                  <label htmlFor="card" className="font-medium text-slate-900 dark:text-white">Credit Card</label>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
                    <Input required placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expiry Date</label>
                    <Input required placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CVC</label>
                    <Input required placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sticky top-24">
            <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>
            
            <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
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

            <Button 
              type="submit" 
              form="checkout-form" 
              size="lg" 
              className="mt-8 w-full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
            </Button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4" /> Secure encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
