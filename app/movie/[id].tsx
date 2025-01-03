import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchMovieDetails } from "../../api/tmdbApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addFavorite, removeFavorite } from "../../store/slices/favoritesSlice";
import { Ionicons } from "@expo/vector-icons";
import FavoriteButton from "../../components/common/favoriteButton/FavoriteButton";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
}

const DetailedMovie = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        setError("Erreur lors du chargement des détails du film");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(
        addFavorite({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        })
      );
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4">Chargement...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">{error || "Une erreur est survenue"}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            className="w-full aspect-[2/3]"
            resizeMode="contain"
          />
          {/* Bouton Retour */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute w-10 h-10 top-4 left-4 bg-black/50 justify-center items-center rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Icône de Cœur */}
          <View className="absolute w-10 h-10 top-4 right-4 bg-transparent justify-center items-center rounded-full">
            <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} />
          </View>
        </View>

        {/* Contenu du film */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-white mb-2">
            {movie.title}
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <View
                key={genre.id}
                className="bg-yellow-500 rounded-full px-3 py-1"
              >
                <Text className="text-black">{genre.name}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-between mb-4">
            <Text className="text-white ">
              📅
              {"  "}
              {new Date(movie.release_date).toLocaleDateString("fr-FR")}
            </Text>
            <Text className="text-white">
              ⭐{"  "}
              {movie.vote_average.toFixed(1)}/10
            </Text>
            <Text className="text-white">🕦 {movie.runtime} min</Text>
          </View>

          <Text className="text-lg font-bold text-white mb-2">Synopsis</Text>
          <Text className="text-white leading-6">{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedMovie;
