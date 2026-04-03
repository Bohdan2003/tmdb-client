import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FiltersBar from '../components/movie/FiltersBar';
import MovieGrid from '../components/movie/MovieGrid';
import { useGetMoviesByCategoryQuery } from '../store/services/tmdbApi';

const DEFAULT_SORT = 'popularity.desc';

export default function FilteredPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') || '1') || 1);
  const sortBy = searchParams.get('sortBy') || DEFAULT_SORT;
  const genresParam = searchParams.get('genres') || '';
  const minRating = Math.max(0, Math.min(10, Number(searchParams.get('ratingMin') || '0') || 0));
  const maxRating = Math.max(0, Math.min(10, Number(searchParams.get('ratingMax') || '10') || 10));
  const ratingRange: [number, number] = minRating <= maxRating ? [minRating, maxRating] : [0, 10];
  const selectedGenreIds = genresParam
    .split(',')
    .map((value) => Number(value))
    .filter((value, index, array) => Number.isInteger(value) && value > 0 && array.indexOf(value) === index);

  const moviesQuery = useGetMoviesByCategoryQuery({
    page,
    genreIds: selectedGenreIds.length ? selectedGenreIds : undefined,
    sortBy,
    ratingGte: ratingRange[0],
    ratingLte: ratingRange[1],
  });

  const setParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    if ('page' in updates) {
      if (!updates.page) {
        next.delete('page');
      }
    } else {
      next.set('page', '1');
    }
    setSearchParams(next);
  };

  const onGenreToggle = (genreId: number) => {
    const hasGenre = selectedGenreIds.includes(genreId);
    const nextGenres = hasGenre
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId];
    setParams({
      genres: nextGenres.length ? nextGenres.join(',') : null,
    });
  };

  const onSortChange = (nextSortBy: string) => {
    setParams({
      sortBy: nextSortBy === DEFAULT_SORT ? null : nextSortBy,
    });
  };

  const onRatingChange = (nextRange: [number, number]) => {
    const nextMin = nextRange[0].toFixed(1);
    const nextMax = nextRange[1].toFixed(1);
    setParams({
      ratingMin: Number(nextMin) === 0 ? null : nextMin,
      ratingMax: Number(nextMax) === 10 ? null : nextMax,
    });
  };

  const onReset = () => {
    setSearchParams({});
  };

  const onPageChange = (nextPage: number) => {
    setParams({ page: String(nextPage) });
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          <div>
            <FiltersBar
              selectedGenreIds={selectedGenreIds}
              sortBy={sortBy}
              ratingRange={ratingRange}
              onGenreToggle={onGenreToggle}
              onSortChange={onSortChange}
              onRatingChange={onRatingChange}
              onReset={onReset}
            />
          </div>
          <div>
            <MovieGrid className="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" query={moviesQuery} />
            {moviesQuery.data && moviesQuery.data.total_pages > 1 && (
              <div className="flex justify-center pt-8 pb-4">
                <Pagination
                  page={page}
                  count={moviesQuery.data.total_pages}
                  color="primary"
                  onChange={(_, nextPage) => onPageChange(nextPage)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
