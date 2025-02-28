import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import WheelPicker from "react-native-wheely";
import Ionicons from "@expo/vector-icons/Ionicons";
import playerContainerStyles from "./(number)/style";
import renderAltOptions from "@/components/AltOptions";

const options = Array.from(new Array(6)).map(
  (_, index) => `${index + 1} Player${!index ? "" : "s"}`
);

export default function GameSelectors() {
  const [selected, setSelected] = useState<number>(3);

  const scaleFunction = (x: number) => {
    return 0.5 * x; // Adjust for desired scale
  };

  return (
    <View style={styles.container}>
      <Text>Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  altContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  altCard: {
    width: "40%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
});
