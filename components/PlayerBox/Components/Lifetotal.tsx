import MinusIcon from "@/assets/icons/minus-sign";
import PlusIcon from "@/assets/icons/plus-sign";
import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import { StyleStore } from "@/store/StyleStore";
import { useState, useMemo, useEffect } from "react";
import { ViewProps } from "react-native";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Line } from "react-native-svg";

interface Props extends ViewProps {
  playerId: number;
  noIcon?: boolean;
}

const LIFE_FONT_SIZE = 48;
const DELTA_FONT_SIZE = Math.floor(LIFE_FONT_SIZE * 0.3333);
const VISUAL_HELPER_ICON_SIZE = Math.round(LIFE_FONT_SIZE / 4);

const LifeTotal = ({ playerId, style, noIcon = false, ...props }: Props) => {
  const [editing, setEditing] = useState(false);
  const lTotal = GameStore((state) => state.players[playerId].lTotal);
  const delta = GameStore((state) => state.players[playerId].delta);

  const playerColor = StyleStore((state) => state.playerColors)[playerId - 1];

  const [deltaColor, signedDelta] = useMemo(() => {
    if (delta > 0) {
      return ["lime", `+${delta}`];
    } else {
      return ["red", `${delta}`];
    }
  }, [delta]);

  const opacity = useMemo(() => (lTotal <= 0 ? 0.5 : 1), [lTotal]);

  const deltaAnimationOffset = useSharedValue(0);

  const deltaAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: deltaAnimationOffset.value }],
      color: deltaColor,
    };
  });

  useEffect(() => {
    deltaAnimationOffset.value = -3;
    deltaAnimationOffset.value = withTiming(0, { duration: 100 });
  }, [delta]);

  const toggleEditing = () => setEditing(!editing);

  const removePlayerFromLayout = GameStore(
    (state) => state.removePlayerFromLayout
  );

  return (
    <>
      <Animated.View
        layout={LinearTransition}
        data-testid={`lifetotal-${playerId}`}
        style={[styles.container, style]}
        {...props}
      >
        <Typography
          layout={LinearTransition}
          testID="delta"
          style={[styles.deltaText, deltaAnimationStyle]}
        >
          {delta !== 0 && signedDelta}
        </Typography>
        {!noIcon && (
          <Animated.View layout={LinearTransition}>
            <MinusIcon
              size={VISUAL_HELPER_ICON_SIZE}
              color={playerColor}
              opacity={opacity}
            />
          </Animated.View>
        )}
        <Typography
          layout={LinearTransition}
          scheme={{ dark: playerColor, light: "#121212" }}
          onLongPress={toggleEditing}
          style={{ ...styles.lifeTotal, opacity }}
          testID={`lifetotal-${playerId}`}
        >
          {lTotal}
        </Typography>
        {!noIcon && (
          <Animated.View layout={LinearTransition}>
            <PlusIcon
              size={VISUAL_HELPER_ICON_SIZE}
              color={playerColor}
              opacity={opacity}
            />
          </Animated.View>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    width: "100%",
  },
  lifeTotal: {
    fontSize: LIFE_FONT_SIZE,
    fontWeight: "bold",
    margin: 10,
  },
  deltaText: {
    fontSize: DELTA_FONT_SIZE,
    marginBottom: 10,
    position: "absolute",
    top: -0,
    right: 0,
    left: 0,
    textAlign: "center",
    fontWeight: "900",
  },
});

export default LifeTotal;
