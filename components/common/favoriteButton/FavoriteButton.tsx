import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, runOnJS } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteAnimation } from "./animations";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  const {
    animateAddFavorite,
    animateRemoveFavorite,
    animatedHeartStyle,
    rippleStyle,
    getParticleStyles,
    particleOpacity,
  } = useFavoriteAnimation();

  // 🌟 Particules - Trajectoire prédéfinie
  const particles = [
    { x: 0, y: -20 },
    { x: 20, y: -10 },
    { x: 20, y: 10 },
    { x: 0, y: 20 },
    { x: -20, y: 10 },
    { x: -20, y: -10 },
  ];

  const particleAnimations = particles.map(() => ({
    scale: useSharedValue(0),
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
  }));

  const handlePress = () => {
    if (!isFavorite) {
      animateAddFavorite(particleAnimations, particles);
    } else {
      animateRemoveFavorite();
    }

    runOnJS(onToggle)();
  };

  const particleStyles = getParticleStyles(particleAnimations);

  return (
    <View className="bg-black/50 rounded-full  justify-center items-center">
      <View className="relative w-10 h-10 justify-center items-center">
        {/* Aura lumineuse */}
        <Animated.View
          style={rippleStyle}
          className="absolute w-12 h-12 rounded-full bg-red-300/50"
        />

        {/* Particules */}
        {particleStyles.map((style, index) => (
          <Animated.View
            key={index}
            style={style}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
          />
        ))}

        {/* Icône du cœur */}
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          className="justify-center items-center"
        >
          <Animated.View
            style={animatedHeartStyle}
            className="justify-center items-center"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "white"}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteButton;
