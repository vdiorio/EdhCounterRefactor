import { SideBar } from "@/components/types";
import PoisonCounterIcon from "@/assets/icons/poison-counter";
import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import {
  selectPlayerColor,
  selectPlayerEnergy,
  selectPlayerExperience,
  selectPlayerPoison,
} from "@/store/selectors";
import StyleStore from "@/store/StyleStore";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SidebarToggleProps } from "../UtilsSideBar.types";

const POISON_COLOR = "#2e7d32";
const ENERGY_COLOR = "#fbc02d";
const XP_COLOR = "#1e88e5";

export default function CountersTopBar({
  playerId,
  selectedBar,
  toggleBar,
  style,
  ...props
}: SidebarToggleProps) {
  const playerColor = StyleStore(selectPlayerColor(playerId));
  const poison = GameStore(selectPlayerPoison(playerId));
  const energy = GameStore(selectPlayerEnergy(playerId));
  const experience = GameStore(selectPlayerExperience(playerId));

  const isSelected = selectedBar === SideBar.counters;
  const accentColor = isSelected ? playerColor : "#8a8a8a";

  const activeCounters = [];

  if (poison > 0) {
    activeCounters.push({
      key: "poison",
      value: poison,
      color: POISON_COLOR,
      icon: (
        <PoisonCounterIcon size={12} color={POISON_COLOR} opacity={0.95} />
      ),
    });
  }

  if (energy > 0) {
    activeCounters.push({
      key: "energy",
      value: energy,
      color: ENERGY_COLOR,
      icon: <Ionicons name="flash" size={12} color={ENERGY_COLOR} />,
    });
  }

  if (experience > 0) {
    activeCounters.push({
      key: "experience",
      value: experience,
      color: XP_COLOR,
      icon: (
        <Typography style={[styles.xpIcon, { color: XP_COLOR }]}>
          XP
        </Typography>
      ),
    });
  }

  return (
    <TouchableOpacity
      testID={`top-bar-counters-${playerId}`}
      activeOpacity={0.85}
      onPress={() => toggleBar(SideBar.counters)}
      style={[
        styles.container,
        {
          borderColor: playerColor,
          backgroundColor: isSelected ? playerColor + "20" : "#0d0d0d",
        },
        style,
      ]}
      {...props}
    >
      {activeCounters.length > 0 ? (
        <View style={styles.countersRow}>
          {activeCounters.map((counter) => (
            <View key={counter.key} style={styles.counterGroup}>
              {counter.icon}
              <Typography style={[styles.value, { color: counter.color }]}>
                {counter.value}
              </Typography>
            </View>
          ))}
        </View>
      ) : (
        <Ionicons name="stats-chart" size={18} color={accentColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    top: -2,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "#0d0d0d",
  },
  countersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  counterGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: "700",
    minWidth: 10,
    textAlign: "center",
    verticalAlign: "middle",
  },
  xpIcon: {
    fontSize: 11,
    fontWeight: "700",
  },
});
