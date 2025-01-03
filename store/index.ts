import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import favoritesReducer from "./slices/favoritesSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
