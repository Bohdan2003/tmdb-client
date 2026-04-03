import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

export default function NotFoundPage() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <p className="text-8xl font-extrabold leading-none text-[#63b6a4]" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-md text-balance opacity-60">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to={routes.home}
        className="mt-2 rounded-full bg-[var(--mui-palette-action-selected)] px-6 py-3 font-semibold text-inherit no-underline transition-colors duration-200 hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
