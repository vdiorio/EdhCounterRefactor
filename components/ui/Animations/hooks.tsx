import { useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

/**
 * Custom hook to handle width animations for players
 */
export const useWidthAnimation = (
  currentWidth: number,
  previousWidth: number,
  isDead: boolean
) => {
  const widthValue = useSharedValue(currentWidth);

  useEffect(() => {
    if (isDead) {
      widthValue.value = withTiming(0, { duration: 1500 });
    } else {
      widthValue.value = withTiming(currentWidth, { duration: 1500 });
    }
  }, [isDead, currentWidth, widthValue]);

  return useAnimatedStyle(() => ({
    width: `${widthValue.value}%`,
    transform: [
      {
        scale: isDead
          ? interpolate(
              widthValue.value,
              [previousWidth * 0.6, previousWidth],
              [0, 1]
            )
          : 1,
      },
    ],
    opacity: interpolate(
      widthValue.value,
      [previousWidth * 0.6, previousWidth],
      [0, 1]
    ),
    overflow: "hidden",
  }));
};
