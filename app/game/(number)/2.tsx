import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import createStyles from "./style";
import playerContainerStyles from "./style";
import renderPlayer from "./renderPlayer";
interface Props {
  alt?: boolean;
}
const TwoPlayerScreen = (props: Props) => {
  const { h50 } = playerContainerStyles;
  return (
    <View style={styles.screen}>
      {renderPlayer({
        playerId: 1,
        playerDirection: Direction.up,
        style: h50,
      })}
      {renderPlayer({
        playerId: 2,
        playerDirection: Direction.down,
        style: h50,
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

export default TwoPlayerScreen;
