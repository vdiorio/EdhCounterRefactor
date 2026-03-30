import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import StyleStore from "@/store/StyleStore";
import { selectPlayerColor } from "@/store/selectors";

export enum SidebarIcon {
  Cdmg = "shield",
  History = "history",
  Counters = "stats-chart",
}

interface ButtonProps extends TouchableOpacityProps {
  selected?: boolean;
  playerId?: number;
  icon: SidebarIcon;
}

export default function SidebarButton({
  selected,
  playerId,
  icon,
  style,
  ...props
}: ButtonProps) {
  const playerColor = playerId
    ? StyleStore(selectPlayerColor(playerId))
    : "#00c1f1";
  const selectedColor = selected ? playerColor : "white";

  const iconProps = {
    size: 22,
    color: selectedColor,
  } as const;

  return (
    <TouchableOpacity
      style={[
        style,
        {
          borderColor: selectedColor,
          backgroundColor: selected ? selectedColor + "25" : undefined,
        },
      ]}
      {...props}
    >
      {icon === SidebarIcon.Cdmg ? (
        <Ionicons name="shield" {...iconProps} />
      ) : icon === SidebarIcon.Counters ? (
        <Ionicons name="stats-chart" {...iconProps} />
      ) : (
        <FontAwesome5 name="history" {...iconProps} />
      )}
    </TouchableOpacity>
  );
}
