import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/tmdb';

interface FavoritesState {
  items: Movie[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateFavorites(state, action: PayloadAction<Movie[]>) {
      state.items = action.payload;
    },
    addFavorite(state, action: PayloadAction<Movie>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { hydrateFavorites, addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
