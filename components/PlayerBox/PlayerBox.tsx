import React, { useRef } from "react";
import { View, StyleSheet, ViewProps, useColorScheme } from "react-native";
import LifeTotal from "./Components/Lifetotal";
import DamageAllButton from "./Components/DamageAllButton";
import IncrementerButtons from "./Components/IncrementerButtons";
import useStyleStore, { StyleStore } from "@/store/StyleStore";
import Animated, { ZoomIn } from "react-native-reanimated";
import AnimatedAdjustableView, {
  AnimatedAdjustableViewProps,
} from "../ui/Animations/AutoAdjustableView";

interface Props extends AnimatedAdjustableViewProps {
  playerId: number;
}

const PlayerBox = ({ playerId, style, ...props }: Props) => {
  const colorScheme = useColorScheme() || "dark";
  const backgroundColor = StyleStore((state) => state.playerColors)[
    playerId - 1
  ];
  const isDark = colorScheme === "dark";

  return (
    <AnimatedAdjustableView
      testID={`player-${playerId}`}
      style={[style, styles.container]}
      {...props}
    >
      <View
        style={[
          styles.content,
          { backgroundColor: isDark ? "" : backgroundColor },
        ]}
      >
        <LifeTotal playerId={playerId} />
      </View>
      <DamageAllButton playerId={playerId} />
      <IncrementerButtons playerId={playerId} />
    </AnimatedAdjustableView>
  );
};

export default PlayerBox;

/* ------- Compnentes ------- */

/* ------- Estilos ------- */

const styles = StyleSheet.create({
  container: {
    borderColor: "#555555",
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    position: "relative",
    minWidth: 200,
  },
});
