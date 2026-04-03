import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { IconButton, LinearProgress, useColorScheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../../router/routes';
import type { RootState } from '../../store';
import { cn } from '../../utils/cn';

const navItems = [
  { label: 'Main', to: routes.home },
  { label: 'Category movies', to: routes.categories },
  { label: 'Filtered movies', to: routes.filtered },
  { label: 'Search', to: routes.search },
  { label: 'Favorites', to: routes.favorites },
];

export default function Header() {
  const { mode, systemMode, setMode } = useColorScheme();
  const location = useLocation();
  const effectiveMode = mode === 'system' ? systemMode : mode;
  const isDark = effectiveMode === 'dark';

  const showLinearProgress = useSelector((state: RootState) => {
    const queries = state.tmdbApi?.queries;
    if (!queries || typeof queries !== 'object') {
      return false;
    }

    return Object.values(queries as Record<string, any>).some(
      (q) => q?.status === 'pending' || q?.isFetching
    );
  });

  const onToggleMode = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <header 
      className={cn('relative', isDark
        ? 'bg-[rgba(255,255,255,0.06)]'
        : 'bg-[#f5f6f8]'
      )}
    >
      <div className="container flex min-h-20 items-center justify-between gap-5">
        <Link to={routes.home} className="inline-flex items-center gap-2" aria-label="Go to main page">
          <span className="text-4xl font-extrabold text-[#63b6a4]">
            TMDB
          </span>
          <span className="h-[30px] w-[54px] rounded-full bg-gradient-to-r from-[#62c3d2] to-[#5fa8dc]" aria-hidden="true" />
        </Link>
        <div
          className="inline-flex flex-wrap items-center justify-center gap-3"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => (
            <nav key={item.to} className="inline-flex items-center gap-3">
              {index > 0 ? <span className="opacity-35" aria-hidden="true">|</span> : null}
              <Link
                to={item.to}
                className={`rounded-full px-[0.85rem] py-[0.45rem] font-semibold leading-none text-inherit no-underline transition-colors duration-200 ease-in-out ${
                  location.pathname === item.to
                    ? 'bg-[var(--mui-palette-action-selected)]'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            </nav>
          ))}
        </div>
        <IconButton
          aria-label="Toggle theme"
          onClick={onToggleMode}
          size="medium"
        >
          {isDark
            ? <LightModeRoundedIcon fontSize="small" />
            : <DarkModeRoundedIcon fontSize="small" />
          }
        </IconButton>
      </div>
      <div
        aria-hidden={!showLinearProgress}
        style={{ height: 4 }}
        className="absolute inset-x-0 bottom-0 left-0 right-0"
      >
        <LinearProgress
          sx={{
            opacity: showLinearProgress ? 1 : 0,
            transition: 'opacity 200ms',
          }}
        />
      </div>
    </header>
  );
}
