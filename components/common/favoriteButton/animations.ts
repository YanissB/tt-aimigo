import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  withSpring,
} from "react-native-reanimated";

// 🌟 Logique d'animation séparée
export const useFavoriteAnimation = () => {
  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const shake = useSharedValue(0);
  const particleOpacity = useSharedValue(0);

  const animateAddFavorite = (particleAnimations: any[], particles: any[]) => {
    particleOpacity.value = withTiming(1, { duration: 200 });
    particleAnimations.forEach((particle, index) => {
      particle.translateX.value = withTiming(particles[index].x, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      particle.translateY.value = withTiming(particles[index].y, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      particle.scale.value = withTiming(1, { duration: 300 });
    });

    setTimeout(() => {
      particleOpacity.value = withTiming(0, { duration: 200 });
    }, 500);

    rippleScale.value = withSequence(
      withTiming(1.5, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
    rippleOpacity.value = withSequence(
      withTiming(0.8, { duration: 200 }),
      withTiming(0, { duration: 200 })
    );

    rotation.value = withSequence(
      withTiming(180, { duration: 200 }),
      withTiming(0, { duration: 200 })
    );

    scale.value = withSpring(1.3, { damping: 5, stiffness: 120 });
  };

  const animateRemoveFavorite = () => {
    shake.value = withSequence(
      withTiming(-3, { duration: 30 }),
      withTiming(3, { duration: 30 }),
      withTiming(-2, { duration: 30 }),
      withTiming(0, { duration: 30 })
    );

    scale.value = withTiming(0.9, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateY: `${rotation.value}deg` },
      { translateX: shake.value },
    ],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  const getParticleStyles = (particleAnimations: any[]) =>
    particleAnimations.map((particle) =>
      useAnimatedStyle(() => ({
        transform: [
          { scale: particle.scale.value },
          { translateX: particle.translateX.value },
          { translateY: particle.translateY.value },
        ],
        opacity: particleOpacity.value,
      }))
    );

  return {
    animateAddFavorite,
    animateRemoveFavorite,
    animatedHeartStyle,
    rippleStyle,
    getParticleStyles,
    particleOpacity,
  };
};
