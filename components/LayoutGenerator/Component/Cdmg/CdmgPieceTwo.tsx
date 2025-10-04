import { Direction } from "@/components/types";
import AnimatedAdjustableView from "@/components/ui/Animations/AutoAdjustableView";
import GameStore from "@/store/GameStore";
import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { getPlayerIds } from "../utils";
import CdmgPiece from "./CdmgPiece";
import Animated from "react-native-reanimated";

interface Props extends ViewProps {
  layout: number[];
}

/**
 * PlayerPieceTwo component for managing two groups of players with independent animations
 */
export default function CdmgPieceTwo({ layout, style, ...props }: Props) {
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
      style={[styles.container, style, isGameWithFiveOrMore && { flex: 3 }]}
      {...props}
    >
      <CdmgPiece layout={layout} index={1} style={{ borderRightWidth: 1 }} />
      <CdmgPiece
        layout={layout}
        index={2}
        style={{ borderLeftWidth: 1, flexDirection: "column-reverse" }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
