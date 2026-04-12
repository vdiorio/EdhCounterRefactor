import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import useAppColors from "@/hooks/useAppColors";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export default function AppModal({ visible, onClose, title, children, contentStyle }: AppModalProps) {
  const colors = useAppColors();

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={onClose}
    >
      <TouchableOpacity
        style={[styles.content, { backgroundColor: "#111" }, contentStyle]}
        activeOpacity={1}
        onPress={() => { /* absorb tap */ }}
      >
        {title && (
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        )}
        {children}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  content: {
    width: "80%",
    padding: 16,
    borderRadius: 8,
    alignItems: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
});
