import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props extends TouchableOpacityProps {
  playerId: number;
}

export const DAMAGE_ALL_INTERVAL = 400;

function starPath(spikes: number, outerR: number, innerR: number, cx: number, cy: number) {
  const step = Math.PI / spikes;
  let path = "";
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
  }
  path += "Z";
  return path;
}

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

  const spikePath = starPath(14, 50, 40, 50, 50);

  return (
    <TouchableOpacity
      style={[styles.Button, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      testID={`damage-all-${playerId}`}
      {...props}
    >
      <Svg style={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Path
          d={spikePath}
          stroke="#ff4d4d"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <Typography style={{ color: "#ff4d4d" }}>-1</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderColor: "#ff4d4d", // Cor sólida como fallback (ver nota sobre gradiente abaixo)
    color: "#ff4d4d",
    alignItems: "center", // Centraliza o texto dentro do botão
    justifyContent: "center", // Centraliza o texto verticalmente
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  },
});

export default DamageAllButton;
