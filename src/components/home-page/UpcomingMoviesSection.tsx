import MovieSection from '../movie/MovieSection';
import { getCategoryRoute } from '../../router/routes';
import { useGetUpcomingMoviesQuery } from '../../store/services/tmdbApi';

export default function UpcomingMoviesSection() {
  const upcomingMoviesQuery = useGetUpcomingMoviesQuery(1);

  return <MovieSection title="Upcoming Movies" query={upcomingMoviesQuery} link={getCategoryRoute('upcoming')} />;
}
