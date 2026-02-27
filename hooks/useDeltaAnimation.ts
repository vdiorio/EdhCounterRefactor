import { useEffect, useMemo } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ANIMATIONS } from "@/constants/ui";

/**
 * Custom hook to manage delta value animation and color.
 * Returns animated style and delta display properties (color, text).
 */
export const useDeltaAnimation = (delta: number) => {
  const deltaAnimationOffset = useSharedValue(0);

  const [deltaColor, signedDelta] = useMemo(() => {
    if (delta > 0) {
      return ["lime", `+${delta}`];
    } else {
      return ["red", `${delta}`];
    }
  }, [delta]);

  const deltaAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: deltaAnimationOffset.value }],
    color: deltaColor,
  }));

  useEffect(() => {
    deltaAnimationOffset.value = -3;
    deltaAnimationOffset.value = withTiming(0, {
      duration: ANIMATIONS.DELTA_ANIMATION,
    });
  }, [delta, deltaAnimationOffset]);

  return {
    deltaAnimationStyle,
    signedDelta,
  };
};
