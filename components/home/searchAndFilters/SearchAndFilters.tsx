import React, { useRef, useCallback, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  fetchMovies,
  setCurrentView,
  setReleaseYear,
  setYearFilterType,
} from "../../../store/slices/movieSlice";
import FilterModal from "../filterModal/FilterModal";

const SearchAndFilters = ({ currentView }: { currentView: string }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    releaseYear: "",
    yearFilterType: "exact" as "exact" | "until",
  });

  const debounceTimeout = useRef<NodeJS.Timeout>();
  const filterDebounceTimeout = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        if (text.trim() === "") {
          dispatch(setCurrentView("popular"));
          dispatch(fetchMovies({ page: 1 }) as any);
        } else {
          dispatch(setCurrentView("search"));
          dispatch(fetchMovies({ page: 1, query: text }) as any);
        }
      }, 500);
    },
    [dispatch]
  );

  const handleFiltersChange = useCallback(
    (newFilters: typeof localFilters) => {
      setLocalFilters(newFilters);

      if (filterDebounceTimeout.current) {
        clearTimeout(filterDebounceTimeout.current);
      }

      filterDebounceTimeout.current = setTimeout(() => {
        dispatch(setReleaseYear(newFilters.releaseYear));
        dispatch(setYearFilterType(newFilters.yearFilterType));

        if (searchText.trim() !== "") {
          dispatch(setCurrentView("search"));
        }

        dispatch(
          fetchMovies({
            page: 1,
            query: searchText.trim() !== "" ? searchText : undefined,
          }) as any
        );
      }, 500);
    },
    [dispatch, searchText]
  );

  return (
    <>
      <View className="flex-row items-center mx-4 mb-4 bg-gray-700 rounded-full px-4 py-2">
        <Ionicons name="search" size={20} color="white" />
        <TextInput
          placeholder="Rechercher un film..."
          placeholderTextColor="#9ca3af"
          className="flex-1 ml-2 text-white"
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          disabled={!searchText.trim()}
        >
          <Ionicons
            name="filter"
            size={20}
            color={
              !searchText.trim()
                ? "#4b5563"
                : localFilters.releaseYear
                ? "yellow"
                : "white"
            }
          />
        </TouchableOpacity>
      </View>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        localFilters={localFilters}
        onFiltersChange={handleFiltersChange}
        currentView={currentView}
        searchText={searchText}
      />
    </>
  );
};

export default React.memo(SearchAndFilters);
