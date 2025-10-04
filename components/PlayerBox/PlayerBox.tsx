import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import LifeTotal from "./Components/Lifetotal";
import IncrementerButtons from "./Components/IncrementerButtons";
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";

import UtilsSideBar from "./Components/UtilsSideBar";
import CdmgSideBar from "./Components/CdmgSideBar";
import { SideBar } from "../types";
import HistorySideBar from "./Components/HistorySideBar";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ScreenStore, { Screen } from "@/store/ScreenStore";

interface Props extends ViewProps {
  playerId: number;
  style?: any;
}

const PlayerBox = ({ playerId, style, ...props }: Props) => {
  const [selectedBar, setSelectedBar] = useState<SideBar | null>(null);

  return (
    <Animated.View
      entering={FadeIn.duration(1000).delay(500)}
      testID={`player-${playerId}`}
      style={[style, styles.container]}
      {...props}
    >
      {selectedBar === SideBar.cdmg && (
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
          <CdmgSideBar style={styles.sideBar} playerId={playerId} />
        </Animated.View>
      )}
      {selectedBar === SideBar.history && (
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
          <HistorySideBar style={styles.sideBar} playerId={playerId} />
        </Animated.View>
      )}
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn.duration(1000)}
        style={[styles.content]}
      >
        <LifeTotal playerId={playerId} />
        <IncrementerButtons playerId={playerId} />
      </Animated.View>
      <UtilsSideBar
        style={[styles.sideBar, styles.utils]}
        playerId={playerId}
        selectSideBar={setSelectedBar}
        selectedBar={selectedBar}
      />
    </Animated.View>
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
    gap: 5,
    flex: 1,
    overflow: "hidden",
  },
  content: {
    justifyContent: "center",
    position: "relative",
    flex: 1,
    width: 500,
  },
  sideBar: {
    height: "100%",
    width: "20%",
    maxWidth: 60,
    minWidth: 60,
    backgroundColor: "#FFFFFF0a",
    borderWidth: 0.5,
    borderColor: "#555555",
  },
  utils: {
    width: 40,
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 0,
  },
});
