import { useParams } from 'react-router-dom';
import MovieCastSection from '../components/movie-details-page/MovieCastSection';
import MovieDetailsSection from '../components/movie-details-page/MovieDetailsSection';
import MovieSimilarSection from '../components/movie-details-page/MovieSimilarSection';

export default function DetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();

  return (
    <>
      <MovieDetailsSection movieId={movieId} />
      <MovieCastSection movieId={movieId} />
      <MovieSimilarSection movieId={movieId} />
    </>
  );
}
