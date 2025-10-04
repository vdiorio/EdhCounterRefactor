import GameStore from "@/store/GameStore";
import DamageAllButton from "./DamageAllButton";
import {
  StyleSheet,
  ViewProps,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Typography from "@/components/ui/Typography";
import { SideBar } from "@/components/types";
import { Ionicons } from "@expo/vector-icons";
import Animated, { LinearTransition } from "react-native-reanimated";
import StyleStore from "@/store/StyleStore";

interface Props extends ViewProps {
  playerId: number;
  selectSideBar: (bar: SideBar | null) => void;
  selectedBar: SideBar | null;
}

interface ButtonProps extends TouchableOpacityProps {
  selected?: boolean;
  playerId?: number;
}

enum SidebarIcon {
  Cdmg = "shield",
  History = "history",
}

const SidebarButton = ({
  selected,
  playerId,
  icon,
  ...props
}: ButtonProps & { icon: SidebarIcon }) => {
  const colors = StyleStore((state) => state.playerColors);
  const playerColor = playerId ? colors[playerId - 1] : "#00c1f1";
  const selectedColor = selected ? playerColor : "white";

  switch (icon) {
    case SidebarIcon.Cdmg:
      return (
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: selectedColor,
              backgroundColor: selected ? selectedColor + "25" : undefined,
            },
          ]}
          {...props}
        >
          <Ionicons name="shield" size={18} color={selectedColor} />
        </TouchableOpacity>
      );
    case SidebarIcon.History:
      return (
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: selectedColor,
              backgroundColor: selected ? selectedColor + "25" : undefined,
            },
          ]}
          {...props}
        >
          <FontAwesome5 name="history" size={16} color={selectedColor} />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

export default function UtilsSideBar({
  playerId,
  style,
  selectSideBar,
  selectedBar,
  ...props
}: Props) {
  const selectBar = (bar: SideBar) => {
    if (selectedBar === bar) selectSideBar(null);
    else selectSideBar(bar);
  };
  return (
    <Animated.View style={[styles.sideBar, style]} {...props}>
      <SidebarButton
        selected={selectedBar === SideBar.cdmg}
        onPress={() => selectBar(SideBar.cdmg)}
        icon={SidebarIcon.Cdmg}
        playerId={playerId}
      />
      <SidebarButton
        selected={selectedBar === SideBar.history}
        onPress={() => selectBar(SideBar.history)}
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
    alignItems: "center", // Centraliza o texto dentro do botão
    justifyContent: "center", // Centraliza o texto verticalmente
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
  },
});
