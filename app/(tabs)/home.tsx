import { useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchMovies, setCurrentView } from "../../store/slices/movieSlice";
import MovieList from "../../components/home/moviesList/MovieList";
import SearchAndFilters from "../../components/home/searchAndFilters/SearchAndFilters";

const Home = () => {
  const { movies, loading, error, currentView, hasMore, page } = useSelector(
    (state: RootState) => state.movie
  );
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList>(null);
  const isFetchingMore = useRef(false);

  const handleViewChange = (view: "popular" | "now_playing") => {
    dispatch(setCurrentView(view));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleEndReached = async () => {
    if (
      isFetchingMore.current ||
      loading ||
      !hasMore ||
      currentView === "search"
    )
      return;

    isFetchingMore.current = true;
    await dispatch(fetchMovies({ page: page + 1 }) as any);
    isFetchingMore.current = false;
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-2xl font-bold mb-4 text-white px-4 pt-4">
        TT-Aimigo
      </Text>

      <View className="flex-row justify-evenly space-x-4 mb-4">
        <TouchableOpacity
          onPress={() => handleViewChange("popular")}
          className={`px-4 py-2 rounded-full ${
            currentView === "popular"
              ? "bg-yellow-500"
              : "border border-yellow-500"
          }`}
        >
          <Text
            className={`${
              currentView === "popular" ? "text-black" : "text-yellow-500"
            } font-medium`}
          >
            Populaires
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleViewChange("now_playing")}
          className={`px-4 py-2 rounded-full ${
            currentView === "now_playing"
              ? "bg-yellow-500"
              : "border border-yellow-500"
          }`}
        >
          <Text
            className={`${
              currentView === "now_playing" ? "text-black" : "text-yellow-500"
            } font-medium`}
          >
            En cours
          </Text>
        </TouchableOpacity>
      </View>

      <SearchAndFilters currentView={currentView} />
      <MovieList
        ref={flatListRef}
        movies={movies}
        loading={loading}
        onEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
};

export default Home;
