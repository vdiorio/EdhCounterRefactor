import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
import CdmgBox from "@/components/CdmgBox/CdmgBox";

interface Props extends ViewProps {
  layout: number[];
  index: number;
  dimensions?: {
    width?: number;
    height?: number;
  };
  direction?: Direction;
}

const CdmgPiece = ({
  layout,
  index,
  dimensions = {},
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
      {alivePlayers.map((playerId, playerIndex) => (
        <CdmgBox
          key={playerId}
          positionId={playerId}
          style={{
            borderBottomWidth: index !== 3 ? 1 : 0,
            borderTopWidth: index !== 0 ? 1 : 0,
          }}
        />
      ))}
    </AnimatedAdjustableView>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    borderColor: "#555555",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
});

export default CdmgPiece;
