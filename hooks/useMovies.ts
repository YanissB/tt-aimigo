import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchMovies,
  setQuery,
  resetFilters,
} from "../store/slices/movieSlice";
import { useEffect, useRef } from "react";

export const useMovies = () => {
  const dispatch = useDispatch();
  const initialFetchDone = useRef<boolean>(false);

  const {
    popularMovies,
    nowPlayingMovies,
    movies,
    filters,
    page,
    loading,
    error,
    hasMore,
    currentView,
  } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    if (!initialFetchDone.current) {
      dispatch(
        fetchMovies({
          page: 1,
        }) as any
      );
      initialFetchDone.current = true;
    }
  }, []);

  /**
   * Charger plus de films pour la pagination
   */
  const fetchMore = () => {
    if (!loading && hasMore) {
      if (currentView === "search") {
        dispatch(
          fetchMovies({
            page: page + 1,
            query: filters.query,
          }) as any
        );
      } else {
        dispatch(
          fetchMovies({
            page: page + 1,
          }) as any
        );
      }
    }
  };

  /**
   * Mettre à jour le titre recherché
   */
  const changeQuery = (query: string) => {
    dispatch(setQuery(query));
  };

  /**
   * Réinitialiser tous les filtres
   */
  const resetAllFilters = () => {
    dispatch(resetFilters());
  };

  // Détermine quels films afficher en fonction de la vue courante
  const displayedMovies = movies;

  return {
    movies: displayedMovies,
    filters,
    loading,
    error,
    hasMore,
    fetchMore,
    changeQuery,
    resetAllFilters,
  };
};