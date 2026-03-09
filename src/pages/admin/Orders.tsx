import { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { orders as initialOrders } from '@/src/data/mockData';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { toast } from 'sonner';

export function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Orders</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 text-xs uppercase text-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'Processing' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Pending</option>
                      <option value="Processing" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Processing</option>
                      <option value="Shipped" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Shipped</option>
                      <option value="Delivered" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Details</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Customer</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Date</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Status</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Total Amount</p>
                  <p className="font-medium text-slate-900 dark:text-white">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-slate-900 dark:text-white">Items</h3>
                <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">1x Sample Product</span>
                    <span className="font-medium text-slate-900 dark:text-white">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
