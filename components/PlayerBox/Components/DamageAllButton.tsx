import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  playerId: number;
}

export const DAMAGE_ALL_INTERVAL = 400;
const BUTTON_SIZE = 50;

const DamageAllButton = ({ playerId }: Props) => {
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
      style={styles.Button}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      testID={`damage-all-${playerId}`}
    >
      <Typography style={{ color: "#121212" }}>-1</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#ff4d4d", // Cor sólida como fallback (ver nota sobre gradiente abaixo)
    borderWidth: 2, // Borda de 2px
    borderRadius: "50%", // Bordas arredondadas
    textTransform: "uppercase", // Transforma o texto em maiúsculas
    alignItems: "center", // Centraliza o texto dentro do botão
    justifyContent: "center", // Centraliza o texto verticalmente
    aspectRatio: 1,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    color: "#121212",
  },
});

export default DamageAllButton;
