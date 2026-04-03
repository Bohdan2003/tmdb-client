import { useEffect, useState, FormEvent } from 'react';
import { keys } from '../../config/keys';
import { useGetPopularMoviesQuery } from '../../store/services/tmdbApi';
import { useNavigate } from 'react-router-dom';
import MovieSearchForm from '../movie/MovieSearchForm';
import { getSearchRoute } from '../../router/routes';

export default function WelcomeSection() {
  const { data } = useGetPopularMoviesQuery(1);
  const [backdropPath, setBackdropPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!data?.results?.length) {
      return;
    }

    const moviesWithBackdrop = data.results.filter((movie) => Boolean(movie.backdrop_path));

    if (!moviesWithBackdrop.length) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    setBackdropPath(moviesWithBackdrop[randomIndex].backdrop_path);
  }, [data]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchInput.trim();
    if (!query) {
      return;
    }
    navigate(getSearchRoute(query, 1));
  };

  const sectionStyle = backdropPath
    ? {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url(${keys.tmdbImageBaseUrl}${backdropPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
    : undefined;

  return (
    <section className="h-[700px] mb-10" style={sectionStyle}>
      <div className="text-white container flex flex-col justify-center h-full">
        <h1 className="text-5xl font-bold uppercase">Welcome</h1>
        <p className="mt-5 text-3xl">
          Browse highlighted titles from TMDB.
        </p>
          <MovieSearchForm
            className="mt-5"
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={onSubmit}
          />
      </div>
    </section>
  );
}