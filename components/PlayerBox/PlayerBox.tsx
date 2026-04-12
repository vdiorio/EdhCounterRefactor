import React, { useEffect, useState } from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import LifeTotal from "./Components/Lifetotal";
import IncrementerButtons from "./Components/IncrementerButtons";
import Animated, {
  FadeIn,
  LinearTransition,
} from "react-native-reanimated";
import { ANIMATIONS } from "@/constants/ui";
import { useSidebarState } from "@/hooks/useSidebarState";

import UtilsSideBar from "./Components/UtilsSideBar";
import { StatusBottomBarSlot } from "./Components/StatusBottomBar";
import SidebarSlot from "./Components/SidebarSlot";
import CountersTopBar from "@/components/PlayerBox/Components/CountersTopBar/index";
import StyleStore from "@/store/StyleStore";
import GameStore from "@/store/GameStore";
import { selectPlayerColor } from "@/store/selectors";
import Confetti from "./Components/Confetti";

interface Props extends ViewProps {
  playerId: number;
  style?: StyleProp<ViewStyle>;
  debugId?: boolean;
}

const PlayerBox = ({ playerId, style, debugId = false, ...props }: Props) => {
  const { selectedBar, toggleBar } = useSidebarState();
  const playerColor = StyleStore(selectPlayerColor(playerId));
  const isStarting = GameStore((s) => s.startingPlayerId === playerId);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isStarting) {
      setShowConfetti(false);
      return;
    }
    const timer = setTimeout(() => setShowConfetti(true), 230);
    return () => clearTimeout(timer);
  }, [isStarting]);

  return (
    <View
      testID={`player-${playerId}`}
      style={[style, styles.container, { borderColor: isStarting ? "#ffffff" : playerColor }]}
      {...props}
    >
      {isStarting && <View style={styles.startingOverlay} pointerEvents="none" />}
      {showConfetti && <Confetti />}
      <SidebarSlot selectedBar={selectedBar} playerId={playerId} />
      <CountersTopBar
        playerId={playerId}
        selectedBar={selectedBar}
        toggleBar={toggleBar}
      />
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn.duration(ANIMATIONS.ENTRY_FADE_DURATION)}
        style={[styles.content]}
      >
        <LifeTotal playerId={playerId} debugId={debugId} />
        <IncrementerButtons playerId={playerId} />
        <StatusBottomBarSlot playerId={playerId} />
      </Animated.View>
      <UtilsSideBar
        style={styles.utils}
        playerId={playerId}
        selectedBar={selectedBar}
        toggleBar={toggleBar}
      />
    </View>
  );
};

export default PlayerBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
  },
  content: {
    justifyContent: "center",
    flex: 1,
    width: 500,
  },
  startingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff18",
    borderRadius: 8,
    zIndex: 10,
  },
  utils: {
    width: 45,
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: "100%",
    backgroundColor: "#FFFFFF0a",
    borderLeftWidth: 0.5,
    borderColor: "#555555",
  },
});
