import { Alert, Button, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PaginatedMoviesResponse } from '../../types/tmdb';
import { getTmdbUserErrorMessage } from '../../store/services/tmdbBaseQuery';
import MovieCard from './MovieCard';

interface QueryState {
  data?: PaginatedMoviesResponse;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}

interface MovieSectionProps {
  title: string;
  query: QueryState;
  link?: string;
}

export default function MovieSection({ title, query, link }: MovieSectionProps) {
  const { data, isLoading, isError, error } = query;
  const movies = data?.results.slice(0, 6) ?? [];

  return (
    <section className="pb-10">
      <div className="container">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-4xl font-semibold">{title}</h2>
          {link ? (
            <Button
              component={RouterLink}
              to={link}
              variant="outlined"
              sx={{ borderRadius: '999px' }}
            >
              View more
            </Button>
          ) : null}
        </div>
        {
          isLoading 
            ? 
            <div
              className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
              aria-busy="true"
              aria-label="Loading movies"
            >
              {Array.from({ length: 6 }).map((_, index) => (
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
            : isError || !data 
              ? 
              <div className="py-5">
                <Alert severity="error">
                  {getTmdbUserErrorMessage(error) ?? 'Oops! Something went wrong.'}
                </Alert>
              </div>
              : !movies.length 
                ? 
                <div className="py-5">
                  <Alert severity="info">No movies found.</Alert>
                </div>
                : 
                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
        }
      </div>
    </section>
  );
}
