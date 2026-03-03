import { useEffect, useMemo } from "react";
import { Dimensions, ViewStyle } from "react-native";
import {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ANIMATIONS } from "@/constants/ui";
import { getPlayerIds } from "@/components/LayoutGenerator/Component/utils";
import { Screen } from "@/store/ScreenStore";

interface LayoutMetrics {
  leftIds: number[];
  rightIds: number[];
  isGameWithFiveOrMore: boolean;
}

interface ScreenFadeStyles {
  gameFadeStyle: AnimatedStyle<ViewStyle>;
  cdmgFadeStyle: AnimatedStyle<ViewStyle>;
}

/**
 * Computes layout-related metrics such as player counts in each slot and side groups.
 */
export function useLayoutMetrics(layout: number[], alivePlayers: number[]): LayoutMetrics {

  const [leftIds, rightIds] = useMemo(
    () => [getPlayerIds(layout, 1), getPlayerIds(layout, 2)],
    [layout]
  );

  const isGameWithFiveOrMore = useMemo(
    () => Math.max(leftIds.length, rightIds.length) >= 2,
    [leftIds, rightIds]
  );

  return { leftIds, rightIds, isGameWithFiveOrMore };
}

/**
 * Returns animated styles used for transitioning between main and cdmg screens.
 */
export function useScreenFadeStyles(screen: Screen): ScreenFadeStyles {
  const opacity = useSharedValue(screen === Screen.cdmg ? 0 : 1);

  useEffect(() => {
    opacity.value = withTiming(screen === Screen.cdmg ? 100 : -100, {
      duration: ANIMATIONS.OPACITY_TRANSITION,
    });
  }, [screen]);

  const gameFadeStyle = useAnimatedStyle(() => ({
    opacity: -Math.min(0, opacity.value) / 100,
  }));

  const screenWidth = Dimensions.get("window").width;
  const cdmgFadeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: (1 - Math.max(0, opacity.value) / 100) * screenWidth },
    ],
  }));

  return { gameFadeStyle, cdmgFadeStyle };
}

export default function useLayoutGenerator(
  layout: number[],
  alivePlayers: number[],
  screen: Screen
) {
  const metrics = useLayoutMetrics(layout, alivePlayers);
  const fades = useScreenFadeStyles(screen);
  return { ...metrics, ...fades };
}
