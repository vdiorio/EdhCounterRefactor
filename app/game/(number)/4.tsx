import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import createStyles from "./style";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import playerContainerStyles from "./style";
import renderPlayer from "./renderPlayer";

interface Props {
  alt?: boolean;
}

interface renderPlayerProps extends ViewProps {
  playerId: number;
  playerDirection: Direction;
}

const FourPlayerScreen = ({ alt = false }: Props) => {
  const { h25, w50, h50, w100, h33, w33 } = playerContainerStyles;

  return (
    <View style={styles.screen}>
      {alt ? (
        <>
          {renderPlayer({
            playerId: 1,
            playerDirection: Direction.up,
            style: h25,
          })}
          {renderPlayer({
            playerId: 2,
            playerDirection: Direction.left,
            style: [w50, h50],
          })}
          {renderPlayer({
            playerId: 3,
            playerDirection: Direction.right,
            style: [w50, h50],
          })}
          {renderPlayer({
            playerId: 4,
            playerDirection: Direction.down,
            style: h25,
          })}
        </>
      ) : (
        <>
          {renderPlayer({
            playerId: 1,
            playerDirection: Direction.left,
            style: [w50, h50],
          })}
          {renderPlayer({
            playerId: 2,
            playerDirection: Direction.right,
            style: [w50, h50],
          })}
          {renderPlayer({
            playerId: 3,
            playerDirection: Direction.left,
            style: [w50, h50],
          })}
          {renderPlayer({
            playerId: 4,
            playerDirection: Direction.right,
            style: [w50, h50],
          })}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FourPlayerScreen;
