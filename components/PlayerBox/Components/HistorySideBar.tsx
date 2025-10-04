import Typography from "@/components/ui/Typography";
import {
  StyleSheet,
  View,
  ScrollView,
  ScrollViewProps,
  Text,
} from "react-native";
import GameStore, { STARTING_LIFE_TOTAL } from "@/store/GameStore";
import { Direction } from "@/components/types";

interface Props extends ScrollViewProps {
  playerId: number;
}

const findDirection = (layout: number[], playerId: number) => {
  let playerIndex = -1;
  layout.reduce((acc, curr, i) => {
    if (playerId <= acc + curr && playerIndex === -1) playerIndex = i;
    return acc + curr;
  }, 0);
  switch (playerIndex) {
    case 0:
      return Direction.up;
    case 1:
      return Direction.left;
    case 2:
      return Direction.right;
    default:
      return Direction.down;
  }
};

export default function HistorySideBar({ playerId, style, ...props }: Props) {
  const history = GameStore((state) => state.players[playerId].history);

  return (
    <View style={[style, styles.container]}>
      <ScrollView contentContainerStyle={[styles.sideBar]} {...props}>
        <View style={[styles.cdmgConteiner, { borderBottomWidth: 1 }]}>
          <Text style={styles.marker} numberOfLines={1}>
            {STARTING_LIFE_TOTAL}
          </Text>
          <Typography
            style={{ textAlign: "center", fontSize: 18 }}
            numberOfLines={1}
          >
            -
          </Typography>
        </View>
        {history.map((entry, i) => {
          const color = entry > 0 ? "#00FF00" : "#FF0000";
          const text = entry > 0 ? `+${entry}` : `${entry}`;
          return (
            <View
              key={i}
              style={[styles.cdmgConteiner, { backgroundColor: color + "1a" }]}
            >
              <Typography style={styles.marker} numberOfLines={1}>
                {STARTING_LIFE_TOTAL +
                  history.slice(0, i + 1).reduce((a, b) => a + b, 0)}{" "}
              </Typography>
              <Typography
                style={{
                  color,
                  textAlign: "right",
                  fontSize: 18,
                  paddingHorizontal: 6,
                }}
                numberOfLines={1}
              >
                {text}
              </Typography>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "#555555",
  },
  sideBar: {
    alignItems: "center",
    width: "100%",
    flexDirection: "column-reverse",
  },
  button: {
    backgroundColor: "#ff4d4d",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cdmgConteiner: {
    position: "relative",
    flex: 1,
    width: "100%",
    opacity: 0.8,
    borderTopWidth: 1,
    borderColor: "#555555",
  },
  marker: {
    position: "absolute",
    left: 5,
    color: "white",
    fontSize: 10,
    opacity: 0.5,
  },
});
