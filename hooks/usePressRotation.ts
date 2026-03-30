import { useCallback, useMemo, useRef } from "react";
import { Animated } from "react-native";

interface UsePressRotationOptions {
  maxDeg?: number;
  duration?: number;
}

export const usePressRotation = (
  options: UsePressRotationOptions = {}
) => {
  const { maxDeg = 45, duration = 300 } = options;
  const rotation = useRef(new Animated.Value(0)).current;

  const rotate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", `${maxDeg}deg`],
      }),
    [rotation, maxDeg]
  );

  const trigger = useCallback(() => {
    rotation.stopAnimation();
    rotation.setValue(0);

    Animated.timing(rotation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [rotation, duration]);

  return {
    rotate,
    trigger,
  };
};