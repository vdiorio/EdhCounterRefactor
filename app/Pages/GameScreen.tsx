import { StyleSheet, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import { useEffect } from "react";
import { Direction } from "@/components/types";
import PlayerPiece from "@/components/LayoutGenerator/Component/Player/PlayerPiece";
import CdmgPiece from "@/components/LayoutGenerator/Component/Cdmg/CdmgPiece";
import useLayoutGenerator from "@/hooks/useLayoutGenerator";
import useAppColors from "@/hooks/useAppColors";
import { useKeepAwake } from "expo-keep-awake";
import Animated, {
  FadeIn,
  ZoomOut,
} from "react-native-reanimated";
import { ANIMATIONS } from "@/constants/ui";

export default function Game() {
  useKeepAwake();

  // Router params for player setup
  const params = useGlobalSearchParams();
  const { alt, playerCount } = {
    alt: params.alternative === "v",
    playerCount: parseInt(String(params.playerCount) || "4"),
  };

  // Game store selectors
  const alivePlayers = GameStore((state) => state.alivePlayers);
  const layout = GameStore((state) => state.gameLayout);
  const screen = ScreenStore((state) => state.screen);
  const setScreen = ScreenStore((state) => state.setScreen);
  const setNumberOfPlayers = GameStore((state) => state.setNumPlayers);

  // Styling
  const colors = useAppColors();

  // Initialize player count once on param change
  useEffect(() => {
    setNumberOfPlayers({ playerCount, alt });
  }, [playerCount, alt, setNumberOfPlayers]);

  // Set game screen and cleanup
  useEffect(() => {
    setScreen({ screen: Screen.game });

    return () => {
      setScreen({ screen: Screen.main });
    };
  }, [setScreen]);

  // Derive helper values from hook (metrics + animation)
  const {
    isGameWithFiveOrMore,
    gameFadeStyle,
    cdmgFadeStyle,
  } = useLayoutGenerator(layout, alivePlayers, screen);

  if (screen === Screen.main) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        entering={FadeIn.duration(ANIMATIONS.STANDARD_DURATION).delay(ANIMATIONS.INITIAL_DELAY)}
        style={styles.gameBody}
      >
        {/* Base game layout */}
        <Animated.View
          style={[styles.overlay, gameFadeStyle]}
          pointerEvents={screen !== "cdmg" ? "auto" : "none"}
        >
          <PlayerPiece
            layout={layout}
            index={0}
            direction={Direction.up}
            style={{ borderBottomWidth: 0.5 }}
          />
          {/* side pieces from indexes 1 & 2 */}
          {(layout[1] || layout[2]) && (
            <View
              style={[
                styles.sideContainer,
                isGameWithFiveOrMore && { flex: 3 },
              ]}
            >
              <PlayerPiece
                layout={layout}
                index={1}
                direction={Direction.left}
                style={styles.left}
              />
              <PlayerPiece
                layout={layout}
                index={2}
                direction={Direction.right}
                style={styles.right}
              />
            </View>
          )}
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
          pointerEvents={screen === "cdmg" ? "auto" : "none"}
        >
          <CdmgPiece
            layout={layout}
            index={0}
            direction={Direction.up}
            style={{ borderBottomWidth: 0.5 }}
          />
          {/* side cdmg pieces (indexes 1 & 2) */}
          {(layout[1] || layout[2]) && (
            <Animated.View
              exiting={ZoomOut}
              style={[styles.sideContainer, isGameWithFiveOrMore && { flex: 3 }]}
            >
              <CdmgPiece layout={layout} index={1} style={{ borderRightWidth: 1 }} />
              <CdmgPiece
                layout={layout}
                index={2}
                style={{ borderLeftWidth: 1, flexDirection: "column-reverse" }}
              />
            </Animated.View>
          )}
          <CdmgPiece
            layout={layout}
            index={3}
            direction={Direction.down}
            style={{ borderTopWidth: 0.5 }}
          />
        </Animated.View>
      </Animated.View>
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
  gameBody: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  sideContainer: {
    flexDirection: "row",
    flex: 2,
  },
  left: {
    borderRightWidth: 1,
    borderColor: "#555555",
  },
  right: {
    borderLeftWidth: 1,
    borderColor: "#555555",
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
  },
});
