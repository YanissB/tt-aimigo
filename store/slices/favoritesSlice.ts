import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface FavoritesState {
  favorites: FavoriteMovie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteMovie>) {
      if (!state.favorites.some((movie) => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;