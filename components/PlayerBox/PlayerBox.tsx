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
import UtilsSideBar from "./Components/UtilsSideBar";
import CdmgSideBar from "./Components/CdmgSideBar";

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
      <CdmgSideBar style={styles.sideBar} playerId={playerId} />
      <View style={[styles.content]}>
        <LifeTotal playerId={playerId} />
        <IncrementerButtons playerId={playerId} />
      </View>
      <UtilsSideBar style={styles.sideBar} playerId={playerId} />
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
    flexDirection: "row",
    paddingHorizontal: "1%",
    paddingTop: "3%",
    paddingBottom: "1%",
    gap: 5,
  },
  content: {
    justifyContent: "center",
    height: "100%",
    position: "relative",
    flex: 1,
    borderColor: "#555555",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  sideBar: {
    height: "100%",
    alignItems: "center",
    width: 30,
  },
});
