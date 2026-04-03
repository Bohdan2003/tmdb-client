export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
}

export interface PaginatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface DiscoverMoviesArgs {
  page?: number;
  genreId?: number;
  genreIds?: number[];
  sortBy?: string;
  primaryReleaseYear?: string;
  ratingGte?: number;
  ratingLte?: number;
}

export interface SearchMoviesArgs {
  query: string;
  page?: number;
}

