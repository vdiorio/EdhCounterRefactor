import Rotator from "@/components/Rotator/Rotator";
import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "./utils";
import PlayerBox from "@/components/PlayerBox/PlayerBox";

interface Props extends ViewProps {
  layout: number[];
  index: number;
  dimensions?: {
    width?: number;
    height?: number;
  };
  direction?: Direction;
}

export default function LayoutPiece({
  layout,
  index,
  dimensions = {},
  direction = Direction.down,
  style,
  ...props
}: Props) {
  const deadPlayers = GameStore((state) => state.deadPlayers);

  const playerIds = useMemo(() => getPlayerIds(layout, index), [layout]);
  const alivePlayers = useMemo(
    () => playerIds.filter((id) => !deadPlayers.includes(id)),
    [playerIds, deadPlayers]
  );

  const playerWidth = 100 / Math.max(alivePlayers.length, 1);

  return (
    <AnimatedAdjustableView
      style={[styles.sideContainer, style]}
      shouldExit={!alivePlayers.length}
      dimensions={dimensions}
      {...props}
    >
      <Rotator direction={direction} style={styles.content}>
        {playerIds.map((playerId) => {
          const playerIndex = alivePlayers.findIndex((id) => id === playerId);
          const shouldHaveBorderLeft = playerIndex !== 0;
          const shouldHaveBorderRight = playerIndex !== alivePlayers.length - 1;
          const borderStyle = {
            borderLeftWidth: shouldHaveBorderLeft ? 0.5 : 0,
            borderRightWidth: shouldHaveBorderRight ? 0.5 : 0,
          };
          return (
            <PlayerBox
              playerId={playerId}
              key={playerId}
              shouldExit={deadPlayers.includes(playerId)}
              dimensions={{ width: playerWidth }}
              style={borderStyle}
            />
          );
        })}
      </Rotator>
    </AnimatedAdjustableView>
  );
}

const styles = StyleSheet.create({
  sideContainer: {
    flexDirection: "row",
    borderColor: "#555555",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
});
