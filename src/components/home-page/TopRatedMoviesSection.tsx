import MovieSection from '../movie/MovieSection';
import { getCategoryRoute } from '../../router/routes';
import { useGetTopRatedMoviesQuery } from '../../store/services/tmdbApi';

export default function TopRatedMoviesSection() {
  const topRatedMoviesQuery = useGetTopRatedMoviesQuery(1);

  return <MovieSection title="Top Rated Movies" query={topRatedMoviesQuery} link={getCategoryRoute('topRated')} />;
}
