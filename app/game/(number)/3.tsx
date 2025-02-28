import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import createStyles from "./style";
import renderPlayer from "./renderPlayer";
import playerContainerStyles from "./style";

interface Props {
  alt?: boolean;
}

const ThreePlayerScreen = ({ alt = false }: Props) => {
  const { w50, h50, h65, h35 } = playerContainerStyles;
  if (alt)
    return (
      <View style={styles.screen}>
        {renderPlayer({
          playerId: 1,
          playerDirection: Direction.left,
          style: w50,
        })}
        <View style={w50}>
          {renderPlayer({
            playerId: 2,
            playerDirection: Direction.right,
            style: h50,
          })}
          {renderPlayer({
            playerId: 3,
            playerDirection: Direction.right,
            style: h50,
          })}
        </View>
      </View>
    );

  return (
    <View style={styles.screen}>
      {renderPlayer({
        playerId: 1,
        playerDirection: Direction.left,
        style: [w50, h65],
      })}
      {renderPlayer({
        playerId: 2,
        playerDirection: Direction.right,
        style: [w50, h65],
      })}
      {renderPlayer({
        playerId: 3,
        playerDirection: Direction.down,
        style: h35,
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
});

export default ThreePlayerScreen;
