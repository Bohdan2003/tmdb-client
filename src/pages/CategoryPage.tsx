import {
  Button,
  Pagination,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/movie/MovieGrid';
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../store/services/tmdbApi';
import Title from '../components/shared/Title';

const categoryOptions = [
  { key: 'popular', label: 'Popular Movies' },
  { key: 'topRated', label: 'Top Rated Movies' },
  { key: 'upcoming', label: 'Upcoming Movies' },
  { key: 'nowPlaying', label: 'Now Playing Movies' },
] as const;

type CategoryKey = (typeof categoryOptions)[number]['key'];

const categoryMap: Record<CategoryKey, string> = {
  popular: 'Popular Movies',
  topRated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
  nowPlaying: 'Now Playing Movies',
};

const isCategoryKey = (value: string): value is CategoryKey => value in categoryMap;

export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'popular';
  const activeCategory: CategoryKey = isCategoryKey(categoryParam) ? categoryParam : 'popular';
  const page = Math.max(1, Number(searchParams.get('page') || '1') || 1);

  const popularQuery = useGetPopularMoviesQuery(page, { skip: activeCategory !== 'popular' });
  const topRatedQuery = useGetTopRatedMoviesQuery(page, { skip: activeCategory !== 'topRated' });
  const upcomingQuery = useGetUpcomingMoviesQuery(page, { skip: activeCategory !== 'upcoming' });
  const nowPlayingQuery = useGetNowPlayingMoviesQuery(page, { skip: activeCategory !== 'nowPlaying' });

  const activeQuery =
    activeCategory === 'popular'
      ? popularQuery
      : activeCategory === 'topRated'
        ? topRatedQuery
        : activeCategory === 'upcoming'
          ? upcomingQuery
          : nowPlayingQuery;

  const onPageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const onCategoryChange = (category: CategoryKey) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', category);
    next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {categoryOptions.map((option) => (
            <Button
              key={option.key}
              variant={activeCategory === option.key ? 'contained' : 'outlined'}
              sx={{ borderRadius: '999px' }}
              onClick={() => onCategoryChange(option.key)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Title
          className="mt-5"
          title={categoryMap[activeCategory]}
          subtitle="Browse movies from the selected category."
        />
        <MovieGrid className="mt-5" query={activeQuery} />
        {
          activeQuery.data &&activeQuery.data?.total_pages > 1 && 
            <div className="flex justify-center pb-4">
              <Pagination
                page={page}
                count={activeQuery.data?.total_pages}
                color="primary"
                onChange={(_, nextPage) => onPageChange(nextPage)}
              />
            </div>
        }
      </div>
    </section>
  );
}
