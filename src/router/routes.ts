export const routes = {
  home: '/',
  notFound: '/404',
  categories: '/categories',
  filtered: '/filtered',
  search: '/search',
  favorites: '/favorites',
  details: '/movie/:movieId',
} as const;

export type MovieCategory = 'popular' | 'topRated' | 'upcoming' | 'nowPlaying';

export const getCategoryRoute = (category: MovieCategory, page = 1) =>
  `${routes.categories}?category=${category}&page=${page}`;

export const getSearchRoute = (query: string, page = 1) =>
  `${routes.search}?query=${encodeURIComponent(query)}&page=${page}`;

export const getMovieDetailsRoute = (movieId: number | string) =>
  `/movie/${movieId}`;
