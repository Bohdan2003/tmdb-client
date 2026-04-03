import MovieCard from '../components/movie/MovieCard';
import Title from '../components/shared/Title';
import { useAppSelector } from '../store/hooks';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <section className="py-10">
      <div className="container">
        <Title
          title="Favorites"
          subtitle="Your saved movies are persisted in localStorage."
        />
        <div className="grid grid-cols-4 gap-4 mt-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
