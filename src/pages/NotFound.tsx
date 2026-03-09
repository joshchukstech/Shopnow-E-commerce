import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <h1 className="mb-4 text-9xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        404
      </h1>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-lg text-slate-600 dark:text-slate-400">
        Sorry, we couldn't find the page you're looking for. It might have been removed or the link is broken.
      </p>
      <Button size="lg" asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}
