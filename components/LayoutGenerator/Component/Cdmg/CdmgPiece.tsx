import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
import CdmgBox from "@/components/CdmgBox/CdmgBox";
import Animated, { ZoomOut } from "react-native-reanimated";

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
  style,
  dimensions = {},
  ...props
}: Props) => {
  const playerIds = useMemo(() => getPlayerIds(layout, index), [layout]);
  const deadPlayers = GameStore((state) => state.deadPlayers);
  const alivePlayerIds = useMemo(
    () => playerIds.filter((id) => !deadPlayers.includes(id)),
    [playerIds, deadPlayers]
  );

  if (alivePlayerIds.length === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.sideContainer, style]}
      exiting={ZoomOut}
      {...props}
    >
      {alivePlayerIds.map((playerId, playerIndex) => {
        const isFirstPlayer = playerIndex === 0;
        const isLastPlayer = playerIndex === alivePlayerIds.length - 1;
        return (
          <CdmgBox
            key={playerId}
            positionId={playerId}
            style={[
              {
                borderBottomWidth: index !== 3 ? 1 : 0,
                borderTopWidth: index !== 0 ? 1 : 0,
              },
              index === 1 && [
                isFirstPlayer && {
                  borderTopWidth: 0,
                },
                isLastPlayer && {
                  borderBottomWidth: 0,
                },
              ],
              index === 2 && [
                isFirstPlayer && {
                  borderBottomWidth: 0,
                },
                isLastPlayer && {
                  borderTopWidth: 0,
                },
              ],
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    borderColor: "#555555",
    flexDirection: "column",
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
});

export default CdmgPiece;
