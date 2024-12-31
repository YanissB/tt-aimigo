import React from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { Movie } from "../../../store/slices/movieSlice";
interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  onEndReached: () => void;
}

export default React.memo(
  React.forwardRef<FlatList<Movie>, MovieListProps>((props, ref) => {
    return (
      <FlatList
        ref={ref}
        data={props.movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View className="flex-row mb-4">
            <View className="w-6 bg-black justify-around">
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
            </View>
            <View className="flex-1 bg-white border-4 rounded-xl border-black flex-row">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                className="w-32 h-full rounded-l-lg"
                resizeMode="cover"
              />
              <View className="flex-1 p-4">
                <Text className="text-xl font-medium mb-3 text-neutral-800">
                  {item.title}
                </Text>
                <Text
                  className="text-sm text-neutral-600 mb-3"
                  numberOfLines={3}
                >
                  {item.overview}
                </Text>
                <View className="justify-between gap-y-2">
                  <Text className="text-sm text-neutral-500">
                    📅 {new Date(item.release_date).toLocaleDateString("fr-FR")}
                  </Text>
                  <Text className="text-sm text-neutral-500">
                    ⭐️{item.vote_average.toFixed(1)}/10
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-6 bg-black justify-around">
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
              <View className="w-4 h-3 bg-white rounded-md mx-auto" />
            </View>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 px-2"
        style={{ backgroundColor: "#000000" }}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        onEndReached={props.onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          props.loading ? (
            <View className="py-4 bg-black">
              <ActivityIndicator size="large" color="white" />
              <Text className="text-white text-center mt-2">
                Chargement en cours...
              </Text>
            </View>
          ) : null
        }
      />
    );
  })
);
