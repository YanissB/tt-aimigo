import axios from "axios";
import { TMDB_ACCESS_TOKEN } from "@env";

/**
 * Axios instance for TMDB API
 */
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

/**
 * Request Interceptor
 */
apiClient.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config.url, config.headers);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
