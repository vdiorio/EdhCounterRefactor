import { useRef } from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import useGameStore from "@/store/GameStore";

interface Props {
  playerId: number;
}

const INCREMENT_HOLD_INTERVAL = 100;

const IncrementerButtons = ({ playerId }: Props) => {
  const playerInterval = useRef<NodeJS.Timeout | null>(null);

  const gameStore = useGameStore();
  const { IncrementLife } = gameStore((state) => state);

  const startAction = (value: number) => {
    playerInterval.current = setInterval(
      () => IncrementLife({ playerId, value }),
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
    <View style={styles.container}>
      {/* Left button */}
      <TouchableHighlight
        style={[styles.touchable]}
        onLongPress={() => startAction(-10)}
        onPress={() => IncrementLife({ playerId, value: -1 })}
        onPressOut={stopAction}
        underlayColor={"rgba(255,0,0,0.1)"}
        activeOpacity={0.4}
      >
        <View />
      </TouchableHighlight>

      {/* Right button */}
      <TouchableHighlight
        style={[styles.touchable]}
        onLongPress={() => startAction(1)}
        onPress={() => IncrementLife({ playerId, value: 1 })}
        onPressOut={stopAction}
        underlayColor={"rgba(0,255,0,0.1)"}
        activeOpacity={0.4}
      >
        <View />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Space out buttons
    width: "100%",
    height: "100%", // Ensure the container takes full height of the parent
    position: "absolute",
    padding: 10,
  },
  touchable: {
    flex: 1, // Make both buttons take up equal width
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Add padding to make buttons larger and more touch-friendly
    borderRadius: 10, // Add border radius for rounded corners
  },
  buttonText: {
    color: "#e0e0e0", // Button text color
    fontSize: 16,
  },
});

export default IncrementerButtons;
