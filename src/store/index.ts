import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { hydrateFavorites } from './features/favoritesSlice';
import { tmdbApi } from './services/tmdbApi';
import type { Movie } from '../types/tmdb';

const FAVORITES_STORAGE_KEY = 'tmdb-client-favorites';

const loadFavoritesFromStorage = (): Movie[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Movie[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

store.dispatch(hydrateFavorites(loadFavoritesFromStorage()));

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
