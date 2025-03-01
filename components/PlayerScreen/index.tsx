import React, { useRef } from "react";
import { View, StyleSheet, ViewProps, useColorScheme } from "react-native";
import LifeTotal from "./Components/Lifetotal";
import DamageAllButton from "./Components/DamageAllButton";
import IncrementerButtons from "./Components/IncrementerButtons";
import useStyleStore from "@/store/StyleStore";

interface Props extends ViewProps {
  playerId: number;
}

const PlayerScreen = ({ playerId, style, ...props }: Props) => {
  const colorScheme = useColorScheme() || "dark";
  const styleStore = useStyleStore();
  const backgroundColor = styleStore((state) => state.playerColors)[
    playerId - 1
  ];
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, style]}>
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
    </View>
  );
};

export default PlayerScreen;

/* ------- Compnentes ------- */

/* ------- Estilos ------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#555555",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
