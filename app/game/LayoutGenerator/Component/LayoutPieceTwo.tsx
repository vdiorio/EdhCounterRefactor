import PlayerScreen from "@/components/PlayerScreen";
import Rotator from "@/components/Rotator";
import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import useGameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "./utils";
import LayoutPiece from "./LayoutPiece";

interface Props extends ViewProps {
  layout: number[];
  dimensions?: {
    width?: number;
    height?: number;
  };
  direction?: Direction;
}

/**
 * LayoutPieceTwo component for managing two groups of players with independent animations
 */
export default function LayoutPieceTwo({
  layout,
  style,
  dimensions,
  ...props
}: Props) {
  const deadPlayers = useGameStore()((state) => state.deadPlayers);
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
      <LayoutPiece
        layout={layout}
        index={1}
        dimensions={{
          width: containerWidth,
        }}
        direction={Direction.left}
        style={{ borderRightWidth: 0.5 }}
      />
      <LayoutPiece
        layout={layout}
        index={2}
        dimensions={{
          width: containerWidth,
        }}
        direction={Direction.right}
        style={{ borderLeftWidth: 0.5 }}
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
