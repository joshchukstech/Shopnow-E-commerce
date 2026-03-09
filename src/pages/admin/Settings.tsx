import { useState } from 'react';
import { useTheme } from '@/src/context/ThemeContext';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { toast } from 'sonner';
import { Upload, Moon, Sun } from 'lucide-react';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [storeName, setStoreName] = useState('Lumière');
  const [storeEmail, setStoreEmail] = useState('contact@lumiere.com');
  const [currency, setCurrency] = useState('USD');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">General Information</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Store Name</label>
                <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Email</label>
                <Input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-50"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>

          {/* Appearance */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Appearance</h2>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Theme Preference</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark mode</p>
              </div>
              <Button variant="outline" onClick={toggleTheme} className="gap-2">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Store Logo</h2>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
                <Upload className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">Select File</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
