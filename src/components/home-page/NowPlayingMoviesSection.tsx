import MovieSection from '../movie/MovieSection';
import { getCategoryRoute } from '../../router/routes';
import { useGetNowPlayingMoviesQuery } from '../../store/services/tmdbApi';

export default function NowPlayingMoviesSection() {
  const nowPlayingMoviesQuery = useGetNowPlayingMoviesQuery(1);

  return <MovieSection title="Now Playing Movies" query={nowPlayingMoviesQuery} link={getCategoryRoute('nowPlaying')} />;
}
