import { Direction } from "@/components/types";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
import PlayerPiece from "./PlayerPiece";
import Animated, { ZoomOut } from "react-native-reanimated";

interface Props extends ViewProps {
  layout: number[];
  direction?: Direction;
}

/**
 * Renders two groups of player pieces (left/right) with exit animations.
 * Only displays groups that have at least one alive player.
 */
export default function PlayerPieceTwo({ layout, style, ...props }: Props) {
  const [leftIds, rightIds] = useMemo(
    () => [getPlayerIds(layout, 1), getPlayerIds(layout, 2)],
    [layout]
  );

  const isGameWithFiveOrMore = useMemo(
    () => Math.max(leftIds.length, rightIds.length) >= 2,
    [leftIds, rightIds]
  );

  if (!layout[1] && !layout[2]) {
    return null;
  }

  return (
    <Animated.View
      exiting={ZoomOut}
      style={[styles.container, style, isGameWithFiveOrMore && { flex: 3 }]}
      {...props}
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
