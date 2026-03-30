import React from "react";
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
import StatusBottomBar from "./Components/StatusBottomBar";
import SidebarSlot from "./Components/SidebarSlot";
import StyleStore from "@/store/StyleStore";
import GameStore from "@/store/GameStore";
import { selectPlayerColor, selectShowMonarchBar, selectShowInitiativeBar } from "@/store/selectors";

interface Props extends ViewProps {
  playerId: number;
  style?: StyleProp<ViewStyle>;
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
      style={[style, styles.container, { borderColor: playerColor }]}
      {...props}
    >
      <SidebarSlot selectedBar={selectedBar} playerId={playerId} />
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
