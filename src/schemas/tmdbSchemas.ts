import { z } from 'zod';

// These schemas validate TMDB responses at runtime.
// They intentionally allow extra keys (passthrough) to avoid breaking on TMDB field changes.

export const GenreSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();

export const MovieSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    vote_count: z.number(),
    release_date: z.string(),
    genre_ids: z.array(z.number()).optional(),
  })
  .passthrough();

export const MovieDetailsSchema = MovieSchema.extend({
  runtime: z.number().nullable(),
  genres: z.array(GenreSchema),
});

export const CastMemberSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
  })
  .passthrough();

export const MovieCreditsResponseSchema = z
  .object({
    id: z.number(),
    cast: z.array(CastMemberSchema),
  })
  .passthrough();

export const PaginatedMoviesResponseSchema = z
  .object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
  })
  .passthrough();

export const GenresResponseSchema = z
  .object({
    genres: z.array(GenreSchema),
  })
  .passthrough();

