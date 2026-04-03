import MovieSection from '../movie/MovieSection';
import { useGetSimilarMoviesQuery } from '../../store/services/tmdbApi';

interface MovieSimilarSectionProps {
  movieId?: string;
}

export default function MovieSimilarSection({ movieId }: MovieSimilarSectionProps) {
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const similarQuery = useGetSimilarMoviesQuery(parsedMovieId, { skip: !isValidMovieId });

  if (!isValidMovieId) {
    return null;
  }

  return <MovieSection title="Similar Movies" query={similarQuery} />;
}
