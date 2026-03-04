import MinusIcon from "@/assets/icons/minus-sign";
import PlusIcon from "@/assets/icons/plus-sign";
import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import { StyleStore } from "@/store/StyleStore";
import {
  selectPlayerLife,
  selectPlayerDelta,
  selectPlayerColor,
} from "@/store/selectors";
import { useState, useMemo } from "react";
import { ViewProps } from "react-native";
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  LinearTransition,
} from "react-native-reanimated";
import { useDeltaAnimation } from "@/hooks/useDeltaAnimation";
import { Line } from "react-native-svg";
import { SIZES } from "@/constants/ui";

interface Props extends ViewProps {
  playerId: number;
  noIcon?: boolean;
  debugId?: boolean;
}

// sizing constants generated from shared values
const LIFE_FONT_SIZE = SIZES.LIFE_FONT_SIZE;
const DELTA_FONT_SIZE = Math.floor(
  LIFE_FONT_SIZE * SIZES.DELTA_FONT_FACTOR
);
const VISUAL_HELPER_ICON_SIZE = Math.round(
  LIFE_FONT_SIZE * SIZES.VISUAL_HELPER_ICON_FACTOR
);

const LifeTotal = ({ playerId, style, noIcon = false, debugId = false,  ...props }: Props) => {
  const [editing, setEditing] = useState(false);
  const lTotal = GameStore(selectPlayerLife(playerId));
  const delta = GameStore(selectPlayerDelta(playerId));
  const playerColor = StyleStore(selectPlayerColor(playerId));

  const opacity = useMemo(() => (lTotal <= 0 ? 0.5 : 1), [lTotal]);

  const { deltaAnimationStyle, signedDelta } =
    useDeltaAnimation(delta);

  const toggleEditing = () => setEditing(!editing);

  const removePlayerFromLayout = GameStore(
    (state) => state.removePlayerFromLayout
  );

  return (
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
        <Animated.View
          layout={LinearTransition}
          style={[
            styles.iconShadow,
            { shadowColor: playerColor },
          ]}
        >
          <MinusIcon
            size={VISUAL_HELPER_ICON_SIZE}
            opacity={opacity}
            color="white"
          />
        </Animated.View>
      )}
      <Typography
        layout={LinearTransition}
        onLongPress={toggleEditing}
        style={[
          styles.lifeTotal,
          {
            textShadowColor: playerColor + "BB",
            textShadowRadius: 1,
            textShadowOffset: { width: 2, height: 2 },
          },
        ]}
        testID={`lifetotal-${playerId}`}
      >
        {debugId ?  playerId : lTotal}
      </Typography>
      {!noIcon && (
        <Animated.View
          layout={LinearTransition}
          style={[
            styles.iconShadow,
            { shadowColor: playerColor },
          ]}
        >
          <PlusIcon
            size={VISUAL_HELPER_ICON_SIZE}
            opacity={opacity}
            color="white"
          />
        </Animated.View>
      )}
    </Animated.View>
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
    top: 0,
    right: 0,
    left: 0,
    textAlign: "center",
    fontWeight: "900",
  },
  iconShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});

export default LifeTotal;
