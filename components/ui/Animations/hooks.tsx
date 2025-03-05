import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

/**
 * Custom hook to handle width animations for players
 */
export const useAutoAdjustmentAnimation = (
  currentWidth: number,
  currentHeight: number,
  shouldExit: boolean = false
) => {
  const widthValue = useSharedValue(currentWidth);
  const heightValue = useSharedValue(currentHeight);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    const timingOptions = { duration: 600 };

    if (shouldExit) {
      widthValue.value = withTiming(0, timingOptions);
      heightValue.value = withTiming(0, timingOptions);
      scaleValue.value = withTiming(0, timingOptions);
    } else {
      scaleValue.value = withTiming(1, timingOptions);
      widthValue.value = withTiming(currentWidth, timingOptions);
      heightValue.value = withTiming(currentHeight, timingOptions);
    }
  }, [shouldExit, currentWidth, currentHeight]);

  return {
    animatedStyle: useAnimatedStyle(() => ({
      width: `${widthValue.value}%`,
      height: `${heightValue.value}%`,
      transform: [{ scale: scaleValue.value }],
      opacity: interpolate(scaleValue.value, [0.7, 1], [0, 1]),
      overflow: "hidden",
      display: scaleValue.value === 0 ? "none" : "flex",
    })),
  };
};

export const useSliderAnimation = (alt: boolean = false) => {
  const offset = useSharedValue<number>(alt ? 100 : 0);
  const scale = useSharedValue<number>(alt ? 0 : 1);

  const { width } = Dimensions.get("window");

  // Derived animated values
  const activePosition = useDerivedValue(() => {
    const position = interpolate(
      offset.value,
      [0, 100],
      [width * -0.24, width * 0.24]
    );
    return withSpring(position, {
      damping: 40,
      stiffness: 150,
    });
  });

  const firstOptionScale = useDerivedValue(() =>
    interpolate(scale.value, [0, 1], [1.08, 0.95])
  );

  const secondOptionScale = useDerivedValue(() =>
    interpolate(scale.value, [0, 1], [0.95, 1.08])
  );

  // Animated styles
  const highlightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activePosition.value }, { scale: 1.08 }],
    opacity: 0.9,
    backgroundColor: "#3498db",
    width: interpolate(
      offset.value,
      [0, 50, 100],
      [width * 0.4, width * 0.35, width * 0.4]
    ),
    shadowOpacity: withSpring(0.3),
    shadowRadius: withSpring(10),
  }));

  const defaultCardStyle = useAnimatedStyle(() => ({
    width: "40%",
    transform: [{ scale: firstOptionScale.value }],
    opacity: interpolate(offset.value, [100, 0], [0.7, 1]),
  }));

  const altCardStyle = useAnimatedStyle(() => ({
    width: "40%",
    transform: [{ scale: secondOptionScale.value }],
    opacity: interpolate(offset.value, [0, 100], [0.7, 1]),
  }));

  // Update animation when alt prop changes
  useEffect(() => {
    const config = { damping: 15, stiffness: 300 };
    offset.value = withSpring(alt ? 100 : 0, config);
    scale.value = withTiming(alt ? 1 : 0, { duration: 300 });
  }, [alt, offset, scale]);

  return {
    defaultCardStyle,
    altCardStyle,
    highlightStyle,
  };
};
