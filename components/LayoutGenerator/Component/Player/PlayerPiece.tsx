import Rotator from "@/components/Rotator/Rotator";
import { Direction } from "@/components/types";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
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

  if (alivePlayers.length === 0) {
    return null;
  }

  return (
    <View style={[styles.sideContainer, style]} {...props}>
      <Rotator direction={direction} style={styles.content}>
        {alivePlayers.map((playerId, playerIndex) => (
          <PlayerBox
            key={playerId}
            playerId={playerId}
            style={{
              borderLeftWidth: playerIndex === 0 ? 0 : 1, // Only show left border for first player
              borderRightWidth: playerIndex === alivePlayers.length - 1 ? 0 : 1, // Only show right border for last player
              borderTopWidth: index % (layout.length - 1) === 0 ? 1 : 0, // Only show top border for first and last Piece
            }}
          />
        ))}
      </Rotator>
    </View>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    flexDirection: "row",
    flex: 1,
  },
  content: {
    flexDirection: "row",
    flex: 1,
  },
});

export default PlayerPiece;
