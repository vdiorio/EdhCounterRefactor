import Rotator from "@/components/Rotator/Rotator";
import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
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

const PlayerPiece = ({
  layout,
  index,
  dimensions = {},
  direction = Direction.down,
  style,
  ...props
}: Props) => {
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
        {alivePlayers.map((playerId, playerIndex) => (
          <PlayerBox
            key={playerId}
            playerId={playerId}
            shouldExit={deadPlayers.includes(playerId)}
            dimensions={{ width: playerWidth }}
            style={{
              borderLeftWidth: playerIndex === 0 ? 0 : 1, // Only show left border for first player
              borderRightWidth: playerIndex === alivePlayers.length - 1 ? 0 : 1, // Only show right border for last player
              borderTopWidth: index % (layout.length - 1) === 0 ? 1 : 0, // Only show top border for first and last Piece
            }}
          />
        ))}
      </Rotator>
    </AnimatedAdjustableView>
  );
};

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

export default PlayerPiece;
