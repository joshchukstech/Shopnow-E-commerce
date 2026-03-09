import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function OrderSuccess() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Payment Successful!
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Thank you for your purchase. We've received your order and are getting it ready to be shipped.
        </p>

        <div className="mb-8 rounded-xl bg-slate-50 p-6 text-left dark:bg-slate-900/50">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Order Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Order Number</p>
              <p className="font-medium text-slate-900 dark:text-white">{orderNumber}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Date</p>
              <p className="font-medium text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Payment Method</p>
              <p className="font-medium text-slate-900 dark:text-white">Credit Card ending in ****</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Shipping Method</p>
              <p className="font-medium text-slate-900 dark:text-white">Standard Delivery</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/shop">Continue Shopping <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/orders"><Package className="mr-2 h-4 w-4" /> Track Order</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
