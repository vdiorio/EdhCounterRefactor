import React from "react";
import { StyleSheet, View } from "react-native";
import LifeTotal from "./Components/Lifetotal";
import IncrementerButtons from "./Components/IncrementerButtons";
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { ANIMATIONS } from "@/constants/ui";
import { useSidebarState } from "@/hooks/useSidebarState";

import UtilsSideBar from "./Components/UtilsSideBar";
import CdmgSideBar from "./Components/CdmgSideBar";
import { SideBar } from "../types";
import HistorySideBar from "./Components/HistorySideBar";
import CountersSideBar from "./Components/CountersSideBar";
import StatusBottomBar from "./Components/StatusBottomBar";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import StyleStore from "@/store/StyleStore";
import GameStore from "@/store/GameStore";
import { selectPlayerColor, selectShowMonarchBar, selectShowInitiativeBar } from "@/store/selectors";

interface Props extends ViewProps {
  playerId: number;
  style?: any;
  debugId?: boolean;
}

const PlayerBox = ({ playerId, style, debugId = false, ...props }: Props) => {
  const { selectedBar, toggleBar } = useSidebarState();
  const playerColor = StyleStore(selectPlayerColor(playerId));
  const showMonarchBar = GameStore(selectShowMonarchBar);
  const showInitiativeBar = GameStore(selectShowInitiativeBar);
  

  return (
    <View
      testID={`player-${playerId}`}
      style={[style, styles.container, {borderColor: playerColor}]}
      {...props}
    >
      {selectedBar === SideBar.cdmg && (
        <Animated.View style={[styles.sideBar, { width: '35%' }]} entering={SlideInLeft} exiting={SlideOutLeft}>
          <CdmgSideBar style={[styles.sideBar]} playerId={playerId} />
        </Animated.View>
      )}
      {selectedBar === SideBar.history && (
        <Animated.View style={[styles.sideBar, { width: '20%' }]} entering={SlideInLeft} exiting={SlideOutLeft}>
          <HistorySideBar style={styles.sideBar} playerId={playerId} />
        </Animated.View>
      )}
      {selectedBar === SideBar.counters && (
        <Animated.View style={[styles.sideBar, { width: "26%" }]} entering={SlideInLeft} exiting={SlideOutLeft}>
          <CountersSideBar style={styles.sideBar} playerId={playerId} />
        </Animated.View>
      )}
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn.duration(ANIMATIONS.ENTRY_FADE_DURATION)}
        style={[styles.content]}
      >
        <LifeTotal playerId={playerId} debugId={debugId} />
        <IncrementerButtons playerId={playerId} />
        {(showMonarchBar || showInitiativeBar) && (
          <StatusBottomBar playerId={playerId} />
        )}
      </Animated.View>
      <UtilsSideBar
        style={[styles.sideBar, styles.utils]}
        playerId={playerId}
        selectedBar={selectedBar}
        toggleBar={toggleBar}
      />
    </View>
  );
};

export default PlayerBox;

/* ------- Compnentes ------- */

/* ------- Estilos ------- */

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    flex: 1,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 10,
    margin: 2
  },
  content: {
    justifyContent: "center",
    flex: 1,
    width: 500,
  },
  sideBar: {
    height: "100%",
    minWidth: 80,
    backgroundColor: "#FFFFFF0a",
    borderWidth: 0.5,
    borderColor: "#555555",
  },
  utils: {
    width: 45,
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 0,
  },
});
