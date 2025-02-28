import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { StyleSheet, View } from "react-native";
import playerContainerStyles from "./style";
import renderPlayer from "./renderPlayer";
interface Props {
  alt?: boolean;
}
const OnePlayerScreen = (props: Props) => {
  return (
    <View style={styles.screen}>
      {renderPlayer({
        playerId: 1,
        playerDirection: Direction.down,
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

export default OnePlayerScreen;
