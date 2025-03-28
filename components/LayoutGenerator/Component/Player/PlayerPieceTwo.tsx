import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
import PlayerPiece from "./PlayerPiece";

interface Props extends ViewProps {
  layout: number[];
  dimensions?: {
    width?: number;
    height?: number;
  };
  direction?: Direction;
}

/**
 * PlayerPieceTwo component for managing two groups of players with independent animations
 */
export default function PlayerPieceTwo({
  layout,
  style,
  dimensions,
  ...props
}: Props) {
  const deadPlayers = GameStore((state) => state.deadPlayers);
  const isPlayerDead = (playerId: number) => {
    if (!deadPlayers) return false;
    return deadPlayers.includes(playerId);
  };

  const playerIdsLeft = useMemo(() => getPlayerIds(layout, 1), [layout]);
  const playerIdsRight = useMemo(() => getPlayerIds(layout, 2), [layout]);

  const aliveLeftPlayers = useMemo(
    () => playerIdsLeft.filter((id) => !isPlayerDead(id)),
    [playerIdsLeft, deadPlayers]
  );
  const aliveRightPlayers = useMemo(
    () => playerIdsRight.filter((id) => !isPlayerDead(id)),
    [playerIdsRight, deadPlayers]
  );

  const containerWidth = useMemo(
    () => (!aliveLeftPlayers.length || !aliveRightPlayers.length ? 100 : 50),
    [aliveLeftPlayers, aliveRightPlayers]
  );

  return (
    <AnimatedAdjustableView
      style={[styles.container, style]}
      shouldExit={!aliveLeftPlayers.length && !aliveRightPlayers.length}
      dimensions={dimensions}
      {...props}
    >
      <PlayerPiece
        layout={layout}
        index={1}
        dimensions={{
          width: containerWidth,
        }}
        direction={Direction.left}
        style={{ borderRightWidth: 1 }}
      />
      <PlayerPiece
        layout={layout}
        index={2}
        dimensions={{
          width: containerWidth,
        }}
        direction={Direction.right}
        style={{ borderLeftWidth: 1 }}
      />
    </AnimatedAdjustableView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sideContainer: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
});
