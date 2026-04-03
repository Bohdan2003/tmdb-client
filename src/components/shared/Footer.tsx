import { Typography, useColorScheme } from '@mui/material';

export default function Footer() {
  const { mode, systemMode } = useColorScheme();
  const effectiveMode = mode === 'system' ? systemMode : mode;
  const isDark = effectiveMode === 'dark';

  return (
    <footer
      className={`mt-auto ${
        isDark
          ? 'bg-[rgba(255,255,255,0.04)]'
          : 'bg-[#f3f4f8]'
      }`}
    >
      <div className="container flex min-h-20 items-center justify-between gap-5 py-5">
        <Typography variant="body2">
          © 2025 Kinopoisk Demo · Data courtesy of TMDB.
        </Typography>
        <a
          href="https://github.com/Bohdan2003"
          target="_blank"
          rel="noreferrer"
          className="text-inherit text-sm underline hover:opacity-80"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
