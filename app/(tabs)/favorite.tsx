import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MovieList from "../../components/home/moviesList/MovieList";

const Favorite = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const formattedFavorites = favorites.map((favorite) => ({
    id: favorite.id,
    title: favorite.title,
    poster_path: favorite.posterPath,
    overview: favorite.overview,
    release_date: favorite.release_date,
    vote_average: favorite.vote_average,
  }));

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-2xl font-bold mb-4 text-white px-4 pt-4">
        Mes Favoris
      </Text>

      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg text-center px-4">
            Vous n'avez pas encore de films favoris.{"\n"}
            Ajoutez-en depuis l'écran principal !
          </Text>
        </View>
      ) : (
        <MovieList
          movies={formattedFavorites}
          loading={false}
          onEndReached={() => {}}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorite;
