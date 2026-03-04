import Typography from "@/components/ui/Typography";
import {
  StyleSheet,
  View,
  ScrollView,
  ScrollViewProps,
  Text,
} from "react-native";
import GameStore from "@/store/GameStore";
import { STARTING_LIFE_TOTAL } from "@/constants/game";


interface Props extends ScrollViewProps {
  playerId: number;
}


export default function HistorySideBar({ playerId, style, ...props }: Props) {
  const history = GameStore((state) => state.players[playerId].history);

  return (
    <View style={[style, styles.container]}>
      <Text style={styles.bump}>
        Histórico
      </Text>
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
  },
  bump: {
    height: 20,
    backgroundColor: "#000",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 10,
    paddingVertical: 2,
  }
});
