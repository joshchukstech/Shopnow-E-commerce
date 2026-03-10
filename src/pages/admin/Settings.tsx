import { useState, useEffect } from 'react';
import { useTheme } from '@/src/context/ThemeContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { toast } from 'sonner';
import { Upload, Moon, Sun } from 'lucide-react';

interface Settings {
  storeName: string;
  storeEmail: string;
  currency: string;
  logo: string | null;
}

const SETTINGS_DOC_ID = 'store-settings';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState('Lumière');
  const [storeEmail, setStoreEmail] = useState('contact@lumiere.com');
  const [currency, setCurrency] = useState('USD');
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as Settings;
        setStoreName(data.storeName || 'Lumière');
        setStoreEmail(data.storeEmail || 'contact@lumiere.com');
        setCurrency(data.currency || 'USD');
        setLogo(data.logo || null);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', SETTINGS_DOC_ID), {
        storeName,
        storeEmail,
        currency,
        logo,
      }, { merge: true });
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogo(result);
        toast.success('Logo uploaded. Click Save to persist.');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = async () => {
    setLogo(null);
    try {
      await setDoc(doc(db, 'settings', SETTINGS_DOC_ID), {
        logo: null,
      }, { merge: true });
      toast.success('Logo removed');
    } catch (error) {
      console.error('Error removing logo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 dark:text-slate-400">Loading settings...</div>
      </div>
    );
  }

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
              {logo ? (
                <>
                  <img src={logo} alt="Store Logo" className="h-24 w-24 object-contain rounded-lg" />
                  <Button variant="outline" size="sm" onClick={removeLogo}>
                    Remove Logo
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
                    <Upload className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <span>Select File</span>
                    </Button>
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
