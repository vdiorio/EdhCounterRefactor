import Animated, { ZoomIn } from "react-native-reanimated";
import PlayerScreen from ".";
import { useMemo } from "react";
import { useWidthAnimation } from "../ui/Animations/hooks";

interface PlayerProps {
  playerId: number;
  isDead: boolean;
  alivePlayers: number;
}

/**
 * AnimatedPlayer component to handle individual player rendering and animations
 */
const AnimatedPlayer = ({ playerId, isDead, alivePlayers }: PlayerProps) => {
  const currentWidth = useMemo(
    () => 100 / Math.max(alivePlayers, 1),
    [alivePlayers]
  );
  const previousWidth = 100 / (alivePlayers + 1);
  const animatedStyle = useWidthAnimation(currentWidth, previousWidth, isDead);

  return (
    <Animated.View style={animatedStyle} entering={ZoomIn}>
      <PlayerScreen playerId={playerId} />
    </Animated.View>
  );
};
