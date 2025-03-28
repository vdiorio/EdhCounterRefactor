import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  LayoutChangeEvent,
  ViewStyle,
} from "react-native";
import { Direction, RotatedStyle } from "../types";

interface Props extends ViewProps {
  direction: Direction;
  isDead?: boolean;
  rotatedStyle?: ViewStyle;
}

const Rotator: React.FC<Props> = ({
  direction,
  children,
  style,
  rotatedStyle,
  isDead,
  ...props
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const isInverted = direction.includes("90");

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (isDead) return;
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
    },
    [direction]
  );

  const getRotatedStyle: () => RotatedStyle = () => {
    const { width, height } = dimensions;
    return {
      transform: [{ rotate: direction }],
      width: isInverted ? height : width,
      height: isInverted ? width : height,
    };
  };

  const rightStyle = direction === Direction.right ? styles.right : null;

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...props}>
      <View
        style={[styles.fullScreen, rightStyle, rotatedStyle, getRotatedStyle()]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    flexDirection: "row",
  },
  right: {},
});

export default Rotator;
