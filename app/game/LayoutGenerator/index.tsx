import { StyleSheet, View, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import useGameStore from "@/store/GameStore";
import { useSharedValue } from "react-native-reanimated";
import LayoutPiece from "./Component/LayoutPiece";
import LayoutPieceTwo from "./Component/LayoutPieceTwo";
import { Direction } from "@/components/types";
import { getPlayerIds } from "./Component/utils";
import { useMemo } from "react";

interface Props extends ViewProps {
  layout: number[];
  component: (props: any) => JSX.Element;
  game?: boolean;
}

/**
 * Finds the layout index for a given player ID
 */

export default function LayoutGenerator({
  layout,
  style,
  component: Component,
  game = false,
  ...props
}: Props) {
  useGameStore().getState().setNumPlayers(6);
  const alivePlayers = useGameStore()((state) => state.alivePlayers);

  const gameMatrix = useMemo(
    () =>
      layout.map((_, index) => {
        return getPlayerIds(layout, index).filter((id) =>
          alivePlayers.includes(id)
        ).length;
      }),
    [alivePlayers, layout]
  );

  const topPieceHeightUnits = useMemo(
    () => (gameMatrix[0] > 0 ? 1 : 0),
    [gameMatrix]
  );

  const bottomPieceHeightUnits = useMemo(
    () => (gameMatrix[3] > 0 ? 1 : 0),
    [gameMatrix]
  );

  const middlePieceHeightUnits = useMemo(() => {
    const max = Math.max(gameMatrix[1], gameMatrix[2]) + 1;
    return gameMatrix[1] + gameMatrix[2] === 1 ? 1 : max;
  }, [gameMatrix]);

  const heightUnit = useMemo(
    () =>
      100 /
      (topPieceHeightUnits + middlePieceHeightUnits + bottomPieceHeightUnits),
    [topPieceHeightUnits, middlePieceHeightUnits, bottomPieceHeightUnits]
  );

  return (
    <View style={styles.gameBody} {...props}>
      <LayoutPiece
        layout={layout}
        index={0}
        direction={Direction.up}
        dimensions={{ height: heightUnit * topPieceHeightUnits }}
        style={{ borderBottomWidth: 0.5 }}
      />
      <LayoutPieceTwo
        layout={layout}
        dimensions={{ height: heightUnit * middlePieceHeightUnits }}
      />
      <LayoutPiece
        layout={layout}
        index={3}
        direction={Direction.down}
        dimensions={{ height: heightUnit * bottomPieceHeightUnits }}
        style={{ borderTopWidth: 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameBody: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
