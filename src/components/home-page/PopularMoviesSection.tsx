import MovieSection from '../movie/MovieSection';
import { useGetPopularMoviesQuery } from '../../store/services/tmdbApi';
import { getCategoryRoute } from '../../router/routes';

export default function PopularMoviesSection() {
  const popularMoviesQuery = useGetPopularMoviesQuery(1);

  return <MovieSection title="Popular Movies" query={popularMoviesQuery} link={getCategoryRoute('popular')} />;
}
