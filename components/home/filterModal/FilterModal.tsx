import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  localFilters: {
    releaseYear: string;
    yearFilterType: "exact" | "until";
  };
  onFiltersChange: (filters: FilterModalProps["localFilters"]) => void;
  currentView: string;
  searchText: string;
}

const FilterModal = ({
  isVisible,
  onClose,
  localFilters,
  onFiltersChange,
}: FilterModalProps) => {
  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="m-0 justify-end"
    >
      <View className="bg-gray-800 rounded-t-3xl p-4">
        <Text className="text-white text-xl font-bold mb-4">Filtres</Text>

        {/* Boutons de type de filtre */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() =>
              onFiltersChange({ ...localFilters, yearFilterType: "exact" })
            }
            className={`flex-1 py-2 rounded-l-full ${
              localFilters.yearFilterType === "exact"
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
          >
            <Text
              className={`text-center ${
                localFilters.yearFilterType === "exact"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Sortie en
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              onFiltersChange({ ...localFilters, yearFilterType: "until" })
            }
            className={`flex-1 py-2 rounded-r-full ${
              localFilters.yearFilterType === "until"
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
          >
            <Text
              className={`text-center ${
                localFilters.yearFilterType === "until"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Depuis l'année
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sélecteur d'année */}
        <View className="bg-gray-700 rounded-xl mb-4">
          <Picker
            selectedValue={localFilters.releaseYear}
            onValueChange={(value) =>
              onFiltersChange({ ...localFilters, releaseYear: value })
            }
            dropdownIconColor="white"
            className="text-white"
          >
            <Picker.Item
              label="Sélectionner une année"
              value=""
              color="white"
            />
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} color="white" />
            ))}
          </Picker>
        </View>

        {/* Boutons d'action */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => {
              onFiltersChange({ releaseYear: "", yearFilterType: "exact" });
              onClose();
            }}
            className="px-4 py-2 bg-gray-600 rounded-full"
          >
            <Text className="text-white">Réinitialiser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="px-4 py-2 bg-yellow-500 rounded-full"
          >
            <Text className="text-black">Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
