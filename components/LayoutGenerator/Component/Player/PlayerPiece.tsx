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
  const playerIds = getPlayerIds(layout, index);

  if (playerIds.length === 0) {
    return null;
  } 

  return (
    <View style={[styles.sideContainer, style]} {...props}>
      <Rotator direction={direction} style={styles.content} flexReverse={direction === Direction.right}>
        {playerIds.map((playerId) => (
          <PlayerBox
            key={playerId}
            playerId={playerId}
          />
        ))}
      </Rotator>
    </View>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    flex: 1,
  },
});

export default PlayerPiece;
