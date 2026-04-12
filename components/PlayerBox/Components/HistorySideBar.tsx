import { useMemo } from "react";
import { useTranslation } from 'react-i18next';
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
import { PlayerViewProps } from "./UtilsSideBar.types";

type Props = PlayerViewProps & ScrollViewProps;

export default function HistorySideBar({ playerId, style, ...props }: Props) {
  const { t } = useTranslation();
  const history = GameStore((state) => state.players[playerId].history);
  const totals = useMemo(() => {
    let running = STARTING_LIFE_TOTAL;
    return history.map((entry) => {
      running += entry;
      return running;
    });
  }, [history]);

  return (
    <View style={style}>
      <Text style={styles.bump}>{t('history')}</Text>
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
                {totals[i]} 
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
  sideBar: {
    alignItems: "center",
    width: "100%",
    flexDirection: "column-reverse",
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
