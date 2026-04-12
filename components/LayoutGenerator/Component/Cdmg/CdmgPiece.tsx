import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import ScreenStore from "@/store/ScreenStore";
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
  const playerIds = getPlayerIds(layout, index);
  const currentPlayerId = ScreenStore((state) => state.playerId);

  if (playerIds.length === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.sideContainer, style]}
      exiting={ZoomOut}
      {...props}
    >
      {playerIds.map((playerId) => {
        return (
          <CdmgBox
            key={playerId}
            positionId={playerId}
            currentPlayerId={currentPlayerId}
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
    zIndex: 50,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
});

export default CdmgPiece;
