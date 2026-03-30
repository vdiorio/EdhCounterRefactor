import DamageAllButton from "./DamageAllButton";
import { StyleSheet } from "react-native";
import { SideBar } from "@/components/types";
import Animated from "react-native-reanimated";
import SidebarButton, { SidebarIcon } from "./SidebarButton";
import { UtilsSideBarProps } from "./UtilsSideBar.types";

export default function UtilsSideBar({
  playerId,
  style,
  toggleBar,
  selectedBar,
  ...props
}: UtilsSideBarProps) {
  return (
    <Animated.View style={[styles.sideBar, style]} {...props}>
      <SidebarButton
        style={styles.button}
        selected={selectedBar === SideBar.cdmg}
        onPress={() => toggleBar(SideBar.cdmg)}
        icon={SidebarIcon.Cdmg}
        playerId={playerId}
      />
      <SidebarButton
        style={styles.button}
        selected={selectedBar === SideBar.history}
        onPress={() => toggleBar(SideBar.history)}
        icon={SidebarIcon.History}
      />
      <SidebarButton
        style={styles.button}
        selected={selectedBar === SideBar.counters}
        onPress={() => toggleBar(SideBar.counters)}
        icon={SidebarIcon.Counters}
        testID={`sidebar-counters-${playerId}`}
      />
      <DamageAllButton playerId={playerId} style={{ marginTop: "auto" }} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    flexDirection: "column",
    gap: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#555555",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 4,
  },
});
