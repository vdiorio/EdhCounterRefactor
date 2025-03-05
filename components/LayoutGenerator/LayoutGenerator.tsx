import { StyleSheet, View, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import useGameStore from "@/store/GameStore";
import { useSharedValue } from "react-native-reanimated";
import LayoutPiece from "./Component/LayoutPiece";
import LayoutPieceTwo from "./Component/LayoutPieceTwo";
import { Direction } from "@/components/types";
import { getPlayerIds } from "./Component/utils";
import { useEffect, useMemo } from "react";

interface Props extends ViewProps {
  component: (props: any) => JSX.Element;
  game?: boolean;
}

/**
 * Finds the layout index for a given player ID
 */
export default function LayoutGenerator({
  style,
  component: Component,
  game = false,
  ...props
}: Props) {
  const alivePlayers = useGameStore()((state) => state.alivePlayers);
  const layout = useGameStore()((state) => state.gameLayout);

  const gameMatrix = useMemo(
    () =>
      layout.map(
        (_, index) =>
          getPlayerIds(layout, index).filter((id) => alivePlayers.includes(id))
            .length
      ),
    [alivePlayers, layout]
  );

  const [topDimensions, bottomDimensions, middleDimensions] = useMemo(() => {
    const top = gameMatrix[0] > 0 ? 1 : 0;
    const bottom = gameMatrix[3] > 0 ? 1 : 0;
    const middle =
      Math.max(gameMatrix[1], gameMatrix[2]) +
      (gameMatrix[1] + gameMatrix[2] <= 1 ? 0 : 1);
    const height = 100 / (top + middle + bottom);

    const topDimensions = { height: top * height };
    const bottomDimensions = { height: bottom * height };
    const middleDimensions = { height: middle * height };

    return [topDimensions, bottomDimensions, middleDimensions];
  }, [gameMatrix]);

  return (
    <View style={styles.gameBody} {...props}>
      <LayoutPiece
        layout={layout}
        index={0}
        direction={Direction.up}
        dimensions={topDimensions}
        style={{ borderBottomWidth: 0.5 }}
      />
      <LayoutPieceTwo layout={layout} dimensions={middleDimensions} />
      <LayoutPiece
        layout={layout}
        index={3}
        direction={Direction.down}
        dimensions={bottomDimensions}
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
