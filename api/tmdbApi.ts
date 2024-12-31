import apiClient from "./apiClient";

/**
 * Fetch Popular Movies
 * @param page Page number for pagination (default: 1)
 * @param language Language for movie data (default: 'fr-FR')
 * @param region Optional region filter
 */
export const fetchPopularMovies = async (
  page: number = 1,
  language: string = "fr-FR",
  year?: string,
  yearFilterType?: "exact" | "until"
) => {
  const params: any = {
    page,
    language,
  };

  if (year) {
    if (yearFilterType === "exact") {
      params.primary_release_year = year;
    } else if (yearFilterType === "until") {
      params.release_date_lte = `${year}-12-31`;
    }
  }

  const response = await apiClient.get("/movie/popular", { params });
  return response.data;
};

/**
 * Fetch Now Playing Movies
 * @param page Page number for pagination (default: 1)
 * @param language Language for movie data (default: 'fr-FR')
 * @param region Optional region filter
 */
export const fetchNowPlayingMovies = async (
  page: number = 1,
  language: string = "fr-FR",
  year?: string,
  yearFilterType?: "exact" | "until"
) => {
  const params: any = {
    page,
    language,
  };

  if (year) {
    if (yearFilterType === "exact") {
      params.primary_release_year = year;
    } else if (yearFilterType === "until") {
      params.release_date_lte = `${year}-12-31`;
    }
  }

  const response = await apiClient.get("/movie/now_playing", { params });
  return response.data;
};

/**
 * Search Movies
 * @param query Search query string
 * @param page Page number for pagination (default: 1)
 * @param language Language for movie data (default: 'fr-FR')
 * @param year Filter by release year
 */
export const searchMovies = async (
  query: string,
  page: number = 1,
  language: string = "fr-FR",
  year?: string,
  yearFilterType?: "exact" | "until"
) => {
  const params: any = {
    query,
    page,
    language,
  };

  if (year) {
    if (yearFilterType === "exact") {
      params.primary_release_year = year;
    } else if (yearFilterType === "until") {
      params.year = year;
    }
  }

  const response = await apiClient.get("/search/movie", { params });
  return response.data;
};

/**
 * Fetch Movie Details
 * @param movieId Movie ID
 * @param language Language code
 */
export const fetchMovieDetails = async (
  movieId: number,
  language: string = "fr-FR"
) => {
  const response = await apiClient.get(`/movie/${movieId}`, {
    params: { language },
  });
  return response.data;
};
