import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import renderPlayer from "./renderPlayer";
import playerContainerStyles from "./style";
interface Props {
  alt?: boolean;
}
const FivePlayerScreen = ({ alt = false }: Props) => {
  const { w50, h50, h33, h30, h35 } = playerContainerStyles;
  if (!alt)
    return (
      <View style={styles.screen}>
        {renderPlayer({
          playerId: 1,
          playerDirection: Direction.left,
          style: [w50, h35],
        })}
        {renderPlayer({
          playerId: 2,
          playerDirection: Direction.right,
          style: [w50, h35],
        })}
        {renderPlayer({
          playerId: 3,
          playerDirection: Direction.left,
          style: [w50, h35],
        })}
        {renderPlayer({
          playerId: 4,
          playerDirection: Direction.right,
          style: [w50, h35],
        })}
        {renderPlayer({
          playerId: 5,
          playerDirection: Direction.down,
          style: h30,
        })}
      </View>
    );
  return (
    <View style={styles.screen}>
      <View style={styles.halfWidth}>
        {renderPlayer({
          playerId: 1,
          playerDirection: Direction.left,
          style: h50,
        })}
        {renderPlayer({
          playerId: 2,
          playerDirection: Direction.left,
          style: h50,
        })}
      </View>
      <View style={styles.halfWidth}>
        {renderPlayer({
          playerId: 3,
          playerDirection: Direction.right,
          style: h33,
        })}
        {renderPlayer({
          playerId: 4,
          playerDirection: Direction.right,
          style: h33,
        })}
        {renderPlayer({
          playerId: 5,
          playerDirection: Direction.right,
          style: h33,
        })}
      </View>
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
  halfWidth: {
    width: "50%",
    height: "100%",
  },
  halfHeight: {
    width: "100%",
    height: "50%",
  },
  half: {
    width: "50%",
    height: "50%",
  },
  halfThird: {
    width: "50%",
    height: "33.333333333%",
  },
  thirdHalf: {
    width: "100%",
    height: "33.333333333%",
  },
});

export default FivePlayerScreen;
