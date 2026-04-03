import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { keys } from '../../config/keys';

export const TMDB_NETWORK_ERROR_MESSAGE = 'Network error. Please try again later.';

export const TMDB_AUTH_ERROR_MESSAGE = 'Invalid auth token. Please try again later.';

export const TMDB_NOT_FOUND_ERROR_MESSAGE = 'Not found.';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: keys.tmdbBaseUrl,
  prepareHeaders: (headers) => {
    if (keys.tmdbAccessToken) {
      headers.set('Authorization', `Bearer ${keys.tmdbAccessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithTmdbErrors: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 'FETCH_ERROR') {
      return {
        error: {
          ...result.error,
          data: { tmdbUserMessage: TMDB_NETWORK_ERROR_MESSAGE },
        },
        meta: result.meta,
      } as unknown as QueryReturnValue<unknown, FetchBaseQueryError, {}>;
    }
    if (result.error.status === 401) {
      return {
        error: {
          ...result.error,
          data: { tmdbUserMessage: TMDB_AUTH_ERROR_MESSAGE },
        },
        meta: result.meta,
      } as unknown as QueryReturnValue<unknown, FetchBaseQueryError, {}>;
    }

    if (result.error.status === 404) {
      // Redirect so the user sees the app-level 404 screen.
      // `fetchBaseQuery` doesn't have access to react-router navigation.
      if (typeof window !== 'undefined') {
        const notFoundPath = '/404';
        if (window.location.pathname !== notFoundPath) {
          window.location.replace(notFoundPath);
        }
      }

      return {
        error: {
          ...result.error,
          data: { tmdbUserMessage: TMDB_NOT_FOUND_ERROR_MESSAGE },
        },
        meta: result.meta,
      } as unknown as QueryReturnValue<unknown, FetchBaseQueryError, {}>;
    }
  }
  return result;
};

function messageFromTmdbErrorData(data: object): string | undefined {
  const d = data as Record<string, unknown>;
  if (typeof d.tmdbUserMessage === 'string' && d.tmdbUserMessage.length > 0) {
    return d.tmdbUserMessage;
  }
  if (typeof d.status_message === 'string' && d.status_message.length > 0) {
    return d.status_message;
  }
  return undefined;
}

export function isFetchBaseQuery404Error(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status: unknown }).status === 404
  );
}

export function getTmdbUserErrorMessage(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('data' in error)) {
    return undefined;
  }
  const data = (error as { data?: unknown }).data;
  if (typeof data === 'object' && data !== null) {
    return messageFromTmdbErrorData(data);
  }
  return undefined;
}
