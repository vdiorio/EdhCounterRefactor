import { useEffect, useState } from "react";
import Animated, {
  AnimatedScrollViewProps,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export interface AnimatedAdjustableViewProps extends AnimatedScrollViewProps {
  shouldExit?: boolean;
  dimensions?: { width?: number; height?: number };
}

/**
 * Custom hook to handle width animations for players
 */
const useAutoAdjustmentAnimation = (
  currentWidth: number,
  currentHeight: number,
  shouldExit: boolean = false
) => {
  const widthValue = useSharedValue(currentWidth);
  const heightValue = useSharedValue(currentHeight);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    const timingOptions = { duration: 400 };

    widthValue.value = withTiming(currentWidth, timingOptions);
    heightValue.value = withTiming(currentHeight, timingOptions);

    if (shouldExit) {
      widthValue.value = withTiming(0, timingOptions);
      heightValue.value = withTiming(0, timingOptions);
      scaleValue.value = withTiming(0, timingOptions);
    } else {
      scaleValue.value = withTiming(1, timingOptions);
    }
  }, [shouldExit, currentWidth, currentHeight]);

  return {
    animatedStyle: useAnimatedStyle(() => ({
      width: `${widthValue.value}%`,
      height: `${heightValue.value}%`,
      transform: [{ scale: scaleValue.value }],
      opacity: interpolate(scaleValue.value, [0.7, 1], [0, 1]),
      overflow: "hidden",
      display: scaleValue.value < 0.05 ? "none" : "flex",
    })),
  };
};

/**
 * AnimatedAdjustableView component to handle individual player rendering and animations
 */
const AnimatedAdjustableView = ({
  shouldExit,
  children,
  style,
  dimensions = {},
  ...props
}: AnimatedAdjustableViewProps) => {
  const [exited, setExited] = useState(false);

  const currentWidth = dimensions?.width || 100;
  const currentHeight = dimensions?.height || 100;

  const { animatedStyle } = useAutoAdjustmentAnimation(
    currentWidth,
    currentHeight,
    shouldExit
  );

  return (
    <>
      {!exited && (
        <Animated.View style={[style, animatedStyle]} {...props}>
          {children}
        </Animated.View>
      )}
    </>
  );
};

export default AnimatedAdjustableView;
