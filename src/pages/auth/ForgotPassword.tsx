import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast.success('Reset link sent to your email');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reset password
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email address
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      ) : (
        <div className="rounded-lg bg-emerald-50 p-4 text-center dark:bg-emerald-900/20">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
            Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
          </p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setIsSubmitted(false)}
          >
            Try another email
          </Button>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
