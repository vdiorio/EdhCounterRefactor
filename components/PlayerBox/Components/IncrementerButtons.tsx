import { useRef } from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import GameStore from "@/store/GameStore";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

interface Props {
  playerId: number;
}

export const INCREMENT_HOLD_INTERVAL = 100;

const IncrementerButtons = ({ playerId }: Props) => {
  const playerInterval = useRef<NodeJS.Timeout | null>(null);

  const { incrementLife } = GameStore((state) => state);

  const incrementByValue = (value: number) =>
    incrementLife({ playerId, value });

  const startAction = (value: number) => {
    playerInterval.current = setInterval(
      () => incrementByValue(value),
      INCREMENT_HOLD_INTERVAL
    );
  };

  const stopAction = () => {
    if (playerInterval.current) {
      clearInterval(playerInterval.current);
      playerInterval.current = null;
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(1000)} style={styles.container}>
      {/* Left button */}
      <TouchableHighlight
        style={[styles.touchable]}
        onLongPress={() => startAction(-1)}
        onPress={() => incrementByValue(-1)}
        onPressOut={stopAction}
        underlayColor={"rgba(255,0,0,0.1)"}
        activeOpacity={0.4}
        testID={`decrementer-${playerId}`}
      >
        <View />
      </TouchableHighlight>

      {/* Right button */}
      <TouchableHighlight
        style={[styles.touchable]}
        onLongPress={() => startAction(1)}
        onPress={() => incrementByValue(1)}
        onPressOut={stopAction}
        underlayColor={"rgba(0,255,0,0.1)"}
        activeOpacity={0.4}
        testID={`incrementer-${playerId}`}
      >
        <View />
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Space out buttons
    width: "100%",
    height: "100%", // Ensure the container takes full height of the parent
    position: "absolute",
  },
  touchable: {
    flex: 1, // Make both buttons take up equal width
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#e0e0e0", // Button text color
    fontSize: 16,
  },
});

export default IncrementerButtons;
