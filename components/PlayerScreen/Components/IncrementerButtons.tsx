import { Direction } from "@/components/types";
import GameStore from "@/store/GameStore";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
interface Props {
  playerId: number;
  playerDirection: Direction;
}

const INCREMENT_HOLD_INTERVAL = 100;
const HALF_SECOND = 500;

const IncrementerButtons = ({ playerId, playerDirection }: Props) => {
  const playerInterval = useRef<NodeJS.Timeout | null>(null);

  const { IncrementLife } = GameStore((state) => state);

  const startAction = (value: number) => {
    IncrementLife({ playerId, value });
    playerInterval.current = setTimeout(() => {
      playerInterval.current = setInterval(
        () => IncrementLife({ playerId, value }),
        INCREMENT_HOLD_INTERVAL
      );
    }, HALF_SECOND);
  };

  const stopAction = () => clearInterval(playerInterval.current || undefined);

  return (
    <>
      <TouchableOpacity
        style={[styles.default, styles.leftTouchArea]}
        onPressIn={() => startAction(-1)}
        onPressOut={stopAction}
        activeOpacity={1}
      />

      <TouchableOpacity
        style={[styles.default, styles.rightTouchArea]}
        onPressIn={() => startAction(1)}
        onPressOut={stopAction}
        activeOpacity={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    position: "absolute",
    zIndex: 1,
  },
  leftTouchArea: {
    left: 0,
    bottom: 0,
    width: "50%",
    height: "100%",
  },
  rightTouchArea: {
    right: 0,
    bottom: 0,
    width: "50%",
    height: "100%",
  },
  downTouchArea: {
    left: 0,
    bottom: 0,
    width: "100%",
    height: "50%",
  },
  upTouchArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "50%",
  },
});

export default IncrementerButtons;
