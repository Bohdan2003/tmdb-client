import { Alert, Skeleton } from '@mui/material';
import { PaginatedMoviesResponse } from '../../types/tmdb';
import { getTmdbUserErrorMessage } from '../../store/services/tmdbBaseQuery';
import { cn } from '../../utils/cn';
import MovieCard from './MovieCard';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface QueryState {
  data?: PaginatedMoviesResponse;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}

interface MovieGridProps {
  className?: string;
  query: QueryState;
  emptyMessage?: string;
}

export default function MovieGrid({
  className,
  query,
  emptyMessage = 'No movies found for the selected criteria.',
}: MovieGridProps) {
  const { data, isLoading, isError, error } = query;
  const errorMessage =
    getTmdbUserErrorMessage(error) ?? 'Failed to load movies.';

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, { id: 'home-trending-error' });
    }
  }, [isError, errorMessage]);

  return (
    isLoading
      ?
      <div
        className={cn('grid grid-cols-4 gap-4', className)}
        aria-busy="true"
        aria-label="Loading movies"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="pointer-events-none">
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '150%', // 2 / 3 aspect ratio
                borderRadius: 22,
                overflow: 'hidden',
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '22px',
                }}
              />
            </div>
            <div className="mt-2">
              <Skeleton variant="text" width="85%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </div>
        ))}
      </div>
      : !data || isError
        ?
        <div className="py-5">
          <Alert severity="error">{errorMessage}</Alert>
        </div>
        :
        !data.results.length
          ?
          <div className="py-5">
            <Alert severity="info">{emptyMessage}</Alert>
          </div>
          :
          <div className={cn('grid grid-cols-4 gap-4', className)}>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
  );
}
