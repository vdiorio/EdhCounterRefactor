import React, { useState, useCallback } from "react";
import { View, StyleSheet, ViewProps, LayoutChangeEvent } from "react-native";
import { Direction, RotatedStyle } from "../types";

interface Props extends ViewProps {
  direction: Direction;
}

const Rotator: React.FC<Props> = ({ direction, children, ...props }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
    },
    [direction]
  );

  const getRotatedStyle = () => {
    const { width, height } = dimensions;
    const isInverted = direction.includes("90");
    return {
      transform: [{ rotate: direction }],
      width: isInverted ? height : width,
      height: isInverted ? width : height,
    };
  };

  return (
    <View style={styles.container} onLayout={onLayout} {...props}>
      <View style={[styles.fullScreen, getRotatedStyle()]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fullScreen: {},
});

export default Rotator;
