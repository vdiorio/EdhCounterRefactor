import GameStore from "@/store/GameStore";
import DamageAllButton from "./DamageAllButton";
import { View, StyleSheet } from "react-native";
import { SideBar } from "@/components/types";
import Animated, { LinearTransition } from "react-native-reanimated";
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
        selected={selectedBar === SideBar.cdmg}
        onPress={() => toggleBar(SideBar.cdmg)}
        icon={SidebarIcon.Cdmg}
        playerId={playerId}
      />
      <SidebarButton
        selected={selectedBar === SideBar.history}
        onPress={() => toggleBar(SideBar.history)}
        icon={SidebarIcon.History}
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
    borderRadius: 5,
  },
});
