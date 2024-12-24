import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  favorites: string[];
}

const initialState: MovieState = {
  favorites: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;
