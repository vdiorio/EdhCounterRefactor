import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import StyleStore from "@/store/StyleStore";
import { selectPlayerColor } from "@/store/selectors";

export enum SidebarIcon {
  Cdmg = "shield",
  History = "history",
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
  ...props
}: ButtonProps) {
  const playerColor = playerId
    ? StyleStore(selectPlayerColor(playerId))
    : "#00c1f1";
  const selectedColor = selected ? playerColor : "white";

  const iconProps = {
    size: icon === SidebarIcon.Cdmg ? 18 : 16,
    color: selectedColor,
  } as const;

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
      {icon === SidebarIcon.Cdmg ? (
        <Ionicons name="shield" {...iconProps} />
      ) : (
        <FontAwesome5 name="history" {...iconProps} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#555555",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 1,
  },
});
