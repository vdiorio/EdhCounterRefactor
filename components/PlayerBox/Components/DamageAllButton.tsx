import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface Props extends TouchableOpacityProps {
  playerId: number;
}

export const DAMAGE_ALL_INTERVAL = 400;
const BUTTON_SIZE = 50;

const DamageAllButton = ({ playerId, style, ...props }: Props) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { damageAllOponents } = GameStore((state) => state);
  const onPress = () => {
    damageAllOponents({ playerId, value: -1 });
  };

  const onLongPress = () => {
    timer.current = setInterval(
      () => damageAllOponents({ playerId, value: 1 }),
      DAMAGE_ALL_INTERVAL
    );
  };

  const onPressOut = () => {
    clearInterval(timer.current || undefined); // Adicionado para limpar o setInterval
  };

  return (
    <TouchableOpacity
      style={[styles.Button, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      testID={`damage-all-${playerId}`}
      {...props}
    >
      <Typography style={{ color: "#ff4d4d" }}>-1</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderColor: "#ff4d4d", // Cor sólida como fallback (ver nota sobre gradiente abaixo)
    borderWidth: 0.5,
    color: "#ff4d4d",
    alignItems: "center", // Centraliza o texto dentro do botão
    justifyContent: "center", // Centraliza o texto verticalmente
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
  },
});

export default DamageAllButton;
