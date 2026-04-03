import { createApi } from '@reduxjs/toolkit/query/react';
import type { ZodType } from 'zod';
import type {
  MovieCreditsResponse,
  DiscoverMoviesArgs,
  GenresResponse,
  MovieDetails,
  PaginatedMoviesResponse,
  SearchMoviesArgs,
} from '../../types/tmdb';
import { baseQueryWithTmdbErrors } from './tmdbBaseQuery';
import {
  GenresResponseSchema,
  MovieCreditsResponseSchema,
  MovieDetailsSchema,
  PaginatedMoviesResponseSchema,
} from '../../schemas/tmdbSchemas';

const validateResponse =
  <T,>(schema: ZodType<T>) =>
  (data: unknown) =>
    schema.parse(data);

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: baseQueryWithTmdbErrors,
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<PaginatedMoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/trending/movie/week',
        params: { page },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getPopularMovies: builder.query<PaginatedMoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/popular',
        params: { page },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getTopRatedMovies: builder.query<PaginatedMoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/top_rated',
        params: { page },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getUpcomingMovies: builder.query<PaginatedMoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/upcoming',
        params: { page },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getNowPlayingMovies: builder.query<PaginatedMoviesResponse, number | void>({
      query: (page = 1) => ({
        url: '/movie/now_playing',
        params: { page },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: validateResponse(MovieDetailsSchema),
    }),
    getMovieCredits: builder.query<MovieCreditsResponse, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: validateResponse(MovieCreditsResponseSchema),
    }),
    getSimilarMovies: builder.query<PaginatedMoviesResponse, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/similar`,
        params: {
          page: 1,
          language: 'en-US',
        },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    getGenres: builder.query<GenresResponse, void>({
      query: () => ({
        url: '/genre/movie/list',
      }),
      transformResponse: validateResponse(GenresResponseSchema),
    }),
    getMoviesByCategory: builder.query<PaginatedMoviesResponse, DiscoverMoviesArgs>({
      query: ({
        page = 1,
        genreId,
        genreIds,
        sortBy = 'popularity.desc',
        primaryReleaseYear,
        ratingGte,
        ratingLte,
      }) => ({
        url: '/discover/movie',
        params: {
          page,
          sort_by: sortBy,
          with_genres: genreIds?.length ? genreIds.join(',') : genreId,
          primary_release_year: primaryReleaseYear,
          'vote_average.gte': ratingGte,
          'vote_average.lte': ratingLte,
          include_adult: false,
          include_video: false,
          language: 'en-US',
        },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
    searchMovies: builder.query<PaginatedMoviesResponse, SearchMoviesArgs>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          query,
          page,
          include_adult: false,
          language: 'en-US',
        },
      }),
      transformResponse: validateResponse(PaginatedMoviesResponseSchema),
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetGenresQuery,
  useGetMoviesByCategoryQuery,
  useSearchMoviesQuery,
} = tmdbApi;
