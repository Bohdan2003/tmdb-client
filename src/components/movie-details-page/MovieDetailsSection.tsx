import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Button, Chip, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keys } from '../../config/keys';
import {
  getTmdbUserErrorMessage,
  isFetchBaseQuery404Error,
} from '../../store/services/tmdbBaseQuery';
import { useGetMovieDetailsQuery } from '../../store/services/tmdbApi';

interface MoveDetailsSectionProps {
  movieId?: string;
}

function formatRuntime(runtime: number | null): string {
  if (!runtime) {
    return 'Runtime: Unknown';
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) {
    return `Runtime: ${minutes}m`;
  }

  return `Runtime: ${hours}h ${minutes}m`;
}

export default function MovieDetailsSection({ movieId }: MoveDetailsSectionProps) {
  const navigate = useNavigate();
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const detailsQuery = useGetMovieDetailsQuery(parsedMovieId, { skip: !isValidMovieId });
  const movie = detailsQuery.data;
  const isMovieNotFound =
    detailsQuery.isError && isFetchBaseQuery404Error(detailsQuery.error);

  const posterSrc = movie?.poster_path
    ? `${keys.tmdbImageBaseUrl}${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster';

  return (
    <section className="py-10">
      <div className="container">
        {!isValidMovieId ? (
          <div className="py-5">
            <Alert severity="error">Invalid movie id.</Alert>
          </div>
        ) : isMovieNotFound ? null : detailsQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
            <div style={{ position: 'relative', width: '100%', paddingTop: '150%' }}>
              <Skeleton
                variant="rectangular"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                }}
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-4xl font-semibold tracking-tight">
                  <Skeleton variant="text" width="70%" />
                </h1>
                <Skeleton variant="rounded" width={90} height={30} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-lg">
                <Skeleton variant="text" width={170} height={24} />
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width={140} height={24} />
              </div>

              <div className="mt-6">
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton variant="text" width="95%" height={24} />
                <Skeleton variant="text" width="90%" height={24} />
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-semibold">
                  <Skeleton variant="text" width="45%" />
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} variant="rounded" width={84} height={32} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : detailsQuery.isError || !movie ? (
          <div className="py-5">
            <Alert severity="error">
              {getTmdbUserErrorMessage(detailsQuery.error) ??
                'Failed to load movie details.'}
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
            <img src={posterSrc} alt={movie.title} className="w-full rounded-3xl object-cover" />
            <div>
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-4xl font-semibold tracking-tight">{movie.title}</h1>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-lg">
                <span className="opacity-80">
                  Release year: {movie.release_date?.slice(0, 4) || 'Unknown'}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-slate-900">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="opacity-80">{formatRuntime(movie.runtime)}</span>
              </div>

              <p className="mt-6 max-w-4xl text-xl/9 opacity-85">
                {movie.overview || 'No overview available.'}
              </p>

              {!!movie.genres.length && (
                <div className="mt-8">
                  <h2 className="text-3xl font-semibold">Genres</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Chip key={genre.id} label={genre.name} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
