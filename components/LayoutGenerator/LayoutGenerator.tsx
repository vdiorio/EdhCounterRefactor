import { Dimensions, StyleSheet, View } from "react-native";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import { useEffect, useMemo } from "react";
import { Direction } from "@/components/types";
import { getPlayerIds } from "./Component/utils";
import PlayerPiece from "./Component/Player/PlayerPiece";
import PlayerPieceTwo from "./Component/Player/PlayerPieceTwo";
import CdmgPiece from "./Component/Cdmg/CdmgPiece";
import CdmgPieceTwo from "./Component/Cdmg/CdmgPieceTwo";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function LayoutGenerator({ style, ...props }: ViewProps) {
  const alivePlayers = GameStore((state) => state.alivePlayers);
  const layout = GameStore((state) => state.gameLayout);
  const screen = ScreenStore((state) => state.screen);

  const setScreen = ScreenStore((state) => state.setScreen);

  useEffect(() => {
    setScreen({ screen: Screen.game });

    return () => {
      setScreen({ screen: Screen.main });
    };
  }, []);

  // calculate gameMatrix once
  const gameMatrix = useMemo(
    () =>
      layout.map(
        (_, index) =>
          getPlayerIds(layout, index).filter((id) => alivePlayers.includes(id))
            .length
      ),
    [alivePlayers, layout]
  );

  const opacity = useSharedValue(screen === Screen.cdmg ? 0 : 1);

  useEffect(() => {
    opacity.value = withTiming(screen === Screen.cdmg ? 100 : -100, {
      duration: 200,
    });
  }, [screen]);

  const gameFadeStyle = useAnimatedStyle(() => ({
    opacity: -Math.min(0, opacity.value) / 100,
  }));

  const screenWidth = Dimensions.get("window").width;

  const cdmgFadeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: (1 - Math.max(0, opacity.value) / 100) * screenWidth },
    ],
  }));

  if (screen === Screen.main) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(300).delay(700)}
      style={styles.gameBody}
      {...props}
    >
      {/* Base game layout */}
      <Animated.View
        style={[styles.overlay, gameFadeStyle]}
        pointerEvents={screen !== "cdmg" ? "auto" : "none"} // allow clicks only when active
      >
        <PlayerPiece
          layout={layout}
          index={0}
          direction={Direction.up}
          style={{ borderBottomWidth: 0.5 }}
        />
        <PlayerPieceTwo layout={layout} />
        <PlayerPiece
          layout={layout}
          index={3}
          direction={Direction.down}
          style={{ borderTopWidth: 0.5 }}
        />
      </Animated.View>

      {/* Overlay for cdmg */}
      <Animated.View
        style={[styles.overlay, cdmgFadeStyle]}
        pointerEvents={screen === "cdmg" ? "auto" : "none"} // allow clicks only when active
      >
        <CdmgPiece
          layout={layout}
          index={0}
          direction={Direction.up}
          style={{ borderBottomWidth: 0.5 }}
        />
        <CdmgPieceTwo layout={layout} />
        <CdmgPiece
          layout={layout}
          index={3}
          direction={Direction.down}
          style={{ borderTopWidth: 0.5 }}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gameBody: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // fills parent View
    justifyContent: "center",
  },
});
