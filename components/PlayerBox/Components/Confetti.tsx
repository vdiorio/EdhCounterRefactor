import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const COLORS = [
  "#FFD700", // gold
  "#FF6B6B", // red
  "#4ECDC4", // teal
  "#45B7D1", // blue
  "#FFEAA7", // yellow
  "#DDA0DD", // plum
  "#98FB98", // pale green
  "#FF69B4", // hot pink
];

interface ParticleConfig {
  id: number;
  color: string;
  left: string;
  delay: number;
  size: number;
  drift: number;
  rotationDir: number;
}

function ConfettiParticle({ color, left, delay, size, drift, rotationDir }: Omit<ParticleConfig, "id">) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 150 }),
        withDelay(700, withTiming(0, { duration: 450 }))
      )
    );
    translateY.value = withDelay(
      delay,
      withTiming(260, { duration: 1300, easing: Easing.in(Easing.quad) })
    );
    translateX.value = withDelay(
      delay,
      withTiming(drift, { duration: 1300 })
    );
    rotation.value = withDelay(
      delay,
      withTiming(rotationDir * 480, { duration: 1300 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        animatedStyle,
        { left, width: size, height: size * 0.5, backgroundColor: color },
      ]}
    />
  );
}

const PARTICLE_COUNT = 24;

function generateParticles(): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length],
    left: `${Math.random() * 88}%`,
    delay: Math.floor(Math.random() * 280),
    size: 7 + Math.random() * 7,
    drift: (Math.random() - 0.5) * 70,
    rotationDir: Math.random() > 0.5 ? 1 : -1,
  }));
}

export default function Confetti() {
  // useMemo with no deps gives fresh values on every mount
  const particles = React.useMemo(generateParticles, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} {...p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    zIndex: 15,
  },
  particle: {
    position: "absolute",
    top: 0,
    borderRadius: 2,
  },
});
