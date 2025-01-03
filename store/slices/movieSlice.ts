import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  searchMovies,
} from "../../api/tmdbApi";
import { RootState } from "../../store";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface Filters {
  query: string;
  releaseYear: string;
  yearFilterType: "exact" | "until";
}

interface MovieState {
  popularMovies: Movie[];
  nowPlayingMovies: Movie[];
  movies: Movie[];
  page: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filters: Filters;
  currentView: "popular" | "now_playing" | "search";
}

// État initial
const initialState: MovieState = {
  popularMovies: [],
  nowPlayingMovies: [],
  movies: [],
  page: 1,
  loading: false,
  error: null,
  hasMore: true,
  currentView: "popular",
  filters: {
    query: "",
    releaseYear: "",
    yearFilterType: "exact",
  },
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (
    {
      page,
      query,
    }: {
      page: number;
      query?: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const currentView = state.movie.currentView;
      const currentQuery = state.movie.filters.query;
      const { releaseYear, yearFilterType } = state.movie.filters;

      const searchQuery = query || currentQuery;

      let results;
      if (
        page === 1 &&
        currentView === "popular" &&
        !searchQuery &&
        state.movie.popularMovies.length > 0
      ) {
        return {
          results: state.movie.popularMovies,
          page,
          hasMore: true,
        };
      }
      if (
        page === 1 &&
        currentView === "now_playing" &&
        !searchQuery &&
        state.movie.nowPlayingMovies.length > 0
      ) {
        return {
          results: state.movie.nowPlayingMovies,
          page,
          hasMore: true,
        };
      }

      if (currentView === "search" && searchQuery) {
        results = await searchMovies(
          searchQuery,
          page,
          "fr-FR",
          releaseYear,
          yearFilterType
        );
      } else if (currentView === "popular") {
        results = await fetchPopularMovies(
          page,
          "fr-FR",
          releaseYear,
          yearFilterType
        );
      } else {
        results = await fetchNowPlayingMovies(
          page,
          "fr-FR",
          releaseYear,
          yearFilterType
        );
      }

      return {
        results: results.results,
        page,
        hasMore: results.results.length > 0,
      };
    } catch (error) {
      return rejectWithValue("Erreur lors du chargement des films");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.filters.query = action.payload;
      state.movies = [];
      state.page = 1;
    },

    setReleaseYear: (state, action: PayloadAction<string>) => {
      state.filters.releaseYear = action.payload;
      state.movies = [];
      state.page = 1;
    },

    resetFilters: (state) => {
      state.filters = {
        query: "",
        releaseYear: "",
        yearFilterType: "exact",
      };
      state.movies = [];
      state.page = 1;
    },

    setCurrentView: (
      state,
      action: PayloadAction<"popular" | "now_playing" | "search">
    ) => {
      state.currentView = action.payload;
      state.page = 1;
      state.movies = [];
      state.hasMore = true;
    },

    setYearFilterType: (state, action: PayloadAction<"exact" | "until">) => {
      state.filters.yearFilterType = action.payload;
      state.movies = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (
          state,
          action: PayloadAction<{
            results: Movie[];
            page: number;
            hasMore: boolean;
          }>
        ) => {
          state.loading = false;
          const newMovies = action.payload.results;

          if (action.payload.page === 1 || state.currentView === "search") {
            state.movies = newMovies;
            if (state.currentView === "popular") {
              state.popularMovies = newMovies;
            } else if (state.currentView === "now_playing") {
              state.nowPlayingMovies = newMovies;
            }
          } else {
            const existingIds = new Set(state.movies.map((movie) => movie.id));
            const uniqueNewMovies = newMovies.filter(
              (movie) => !existingIds.has(movie.id)
            );

            state.movies = [...state.movies, ...uniqueNewMovies];
            if (state.currentView === "popular") {
              state.popularMovies = [
                ...state.popularMovies,
                ...uniqueNewMovies,
              ];
            } else if (state.currentView === "now_playing") {
              state.nowPlayingMovies = [
                ...state.nowPlayingMovies,
                ...uniqueNewMovies,
              ];
            }
          }

          state.page = action.payload.page;
          state.hasMore = action.payload.hasMore;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setQuery,
  setReleaseYear,
  resetFilters,
  setCurrentView,
  setYearFilterType,
} = movieSlice.actions;
export default movieSlice.reducer;
