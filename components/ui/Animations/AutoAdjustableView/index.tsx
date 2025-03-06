import { useState } from "react";
import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";
import { useAutoAdjustmentAnimation } from "../hooks";

export interface AnimatedAdjustableViewProps extends AnimatedScrollViewProps {
  shouldExit?: boolean;
  dimensions?: { width?: number; height?: number };
}

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
  const currentWidth = dimensions?.width || 100;
  const currentHeight = dimensions?.height || 100;

  const { animatedStyle } = useAutoAdjustmentAnimation(
    currentWidth,
    currentHeight,
    shouldExit
  );

  return (
    <Animated.View style={[style, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedAdjustableView;
