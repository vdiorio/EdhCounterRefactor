import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import playerContainerStyles from "./style";
import renderPlayer from "./renderPlayer";
interface Props {
  alt?: boolean;
}
const SixPlayerScreen = ({ alt = false }: Props) => {
  const { w50, h33, h30, h20 } = playerContainerStyles;

  if (alt)
    return (
      <View style={styles.screen}>
        {renderPlayer({
          playerId: 1,
          playerDirection: Direction.up,
          style: h20,
        })}
        {renderPlayer({
          playerId: 2,
          playerDirection: Direction.left,
          style: [w50, h30],
        })}
        {renderPlayer({
          playerId: 3,
          playerDirection: Direction.right,
          style: [w50, h30],
        })}
        {renderPlayer({
          playerId: 4,
          playerDirection: Direction.left,
          style: [w50, h30],
        })}
        {renderPlayer({
          playerId: 5,
          playerDirection: Direction.right,
          style: [w50, h30],
        })}
        {renderPlayer({
          playerId: 6,
          playerDirection: Direction.down,
          style: h20,
        })}
      </View>
    );
  return (
    <View style={styles.screen}>
      {renderPlayer({
        playerId: 1,
        playerDirection: Direction.left,
        style: [w50, h33],
      })}
      {renderPlayer({
        playerId: 2,
        playerDirection: Direction.right,
        style: [w50, h33],
      })}
      {renderPlayer({
        playerId: 3,
        playerDirection: Direction.left,
        style: [w50, h33],
      })}
      {renderPlayer({
        playerId: 4,
        playerDirection: Direction.right,
        style: [w50, h33],
      })}
      {renderPlayer({
        playerId: 5,
        playerDirection: Direction.left,
        style: [w50, h33],
      })}
      {renderPlayer({
        playerId: 6,
        playerDirection: Direction.right,
        style: [w50, h33],
      })}
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
    height: "30%",
  },
  quarterHeight: {
    width: "100%",
    height: "20%",
  },
  third: {
    width: "50%",
    height: "33%",
  },
});

export default SixPlayerScreen;
