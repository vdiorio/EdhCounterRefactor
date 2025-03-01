import Typography from "@/components/ui/Typography";
import useGameStore from "@/store/GameStore";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  playerId: number;
}

const DAMAGE_ALL_INTERVAL = 500;
const BUTTON_SIZE = 50;

const DamageAllButton = ({ playerId }: Props) => {
  const store = useGameStore();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { damageAllOponents } = store((state) => state);
  const onPress = () => {
    damageAllOponents({ playerId, value: -1 });
  };

  const onLongPress = () => {
    timer.current = setTimeout(() => {
      damageAllOponents({ playerId, value: 1 });
      timer.current = setInterval(
        () => damageAllOponents({ playerId, value: 1 }),
        DAMAGE_ALL_INTERVAL
      );
    }, DAMAGE_ALL_INTERVAL);
  };

  const onPressOut = () => {
    clearTimeout(timer.current || undefined);
    clearInterval(timer.current || undefined); // Adicionado para limpar o setInterval
  };

  return (
    <TouchableOpacity
      style={styles.Button}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
    >
      <Typography style={{ color: "#1a1a1a" }}>-1</Typography>
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
    color: "#1a1a1a",
  },
});

export default DamageAllButton;
