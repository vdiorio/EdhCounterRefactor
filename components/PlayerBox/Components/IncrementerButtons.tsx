import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import GameStore from "@/store/GameStore";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useIncrementAction } from "@/hooks/useIncrementAction";

interface Props {
  playerId: number;
}

const IncrementerButtons = ({ playerId }: Props) => {
  const { incrementLife } = GameStore((state) => state);

  const incrementByValue = (value: number) =>
    incrementLife({ playerId, value });

  const { startAction, stopAction } = useIncrementAction(incrementByValue);

  return (
    <Animated.View style={styles.container}>
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
