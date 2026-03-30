import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import { usePressRotation } from "../../../hooks/usePressRotation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Animated,
  Easing,
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
  const { rotate, trigger } = usePressRotation({ maxDeg: 45, duration: 300 });
  const longPressRotateValue = useRef(new Animated.Value(0)).current;
  const longPressRotateLoop = useRef<Animated.CompositeAnimation | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const { damageAllOponents } = GameStore((state) => state);

  const longPressRotate = useMemo(
    () =>
      longPressRotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-360deg"],
      }),
    [longPressRotateValue]
  );

  useEffect(() => {
    return () => {
      longPressRotateLoop.current?.stop();
    };
  }, []);

  const startLongPressSpin = () => {
    setIsLongPressing(true);
    longPressRotateLoop.current?.stop();
    longPressRotateValue.setValue(0);
    longPressRotateLoop.current = Animated.loop(
      Animated.timing(longPressRotateValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    longPressRotateLoop.current.start();
  };

  const stopLongPressSpin = () => {
    setIsLongPressing(false);
    longPressRotateLoop.current?.stop();
    longPressRotateValue.setValue(0);
  };

  const onPress = () => {
    damageAllOponents({ playerId, value: -1 });
    trigger();
  };

  const onLongPress = () => {
    startLongPressSpin();
    timer.current = setInterval(
      () => damageAllOponents({ playerId, value: 1 }),
      DAMAGE_ALL_INTERVAL
    );
  };

  const onPressOut = () => {
    clearInterval(timer.current || undefined);
    timer.current = null;
    stopLongPressSpin();
  };

  const spikePath = starPath(8, 50, 40, 50, 50);

  return (
    <TouchableOpacity
      style={[styles.Button, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      testID={`damage-all-${playerId}`}
      {...props}
    >
      <Animated.View
        style={[
          styles.animatedBorder,
          { transform: [{ rotate }, { rotate: longPressRotate }] },
        ]}
      >
        <Svg style={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path
            d={spikePath}
            stroke={isLongPressing ? "lime" : "#ff4d4d"}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
      <Typography style={{ color: isLongPressing ? "lime" : "#ff4d4d" }}>
        {isLongPressing ? "+1" : "-1"}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderColor: "#ff4d4d",
    color: "#ff4d4d",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
  },
  animatedBorder: {
    width: "100%",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
  },
  svg: {
    width: "100%",
    height: "100%",
  },
});

export default DamageAllButton;
