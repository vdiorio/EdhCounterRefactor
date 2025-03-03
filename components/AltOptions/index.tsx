import { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getPlayerLayout } from "@/store/playerLayouts";
import Rotator from "../Rotator";
import { Direction } from "../types";

// Constants
const { width } = Dimensions.get("window");

// Types
interface AltSelectorProps {
  onChange: (value: boolean) => void;
  playerCount: number;
  alt: boolean;
  colors?: any;
}

/**
 * Component that allows selecting between default and alternative layouts
 */
const AltSelector = ({ onChange, playerCount, alt }: AltSelectorProps) => {
  // Animation values
  const offset = useSharedValue<number>(alt ? 100 : 0);
  const scale = useSharedValue<number>(alt ? 0 : 1);

  // Derived animated values
  const activePosition = useDerivedValue(() => {
    const position = interpolate(
      offset.value,
      [0, 100],
      [width * -0.24, width * 0.24],
      Extrapolate.CLAMP
    );
    return withSpring(position, {
      damping: 40,
      stiffness: 150,
    });
  });

  const firstOptionScale = useDerivedValue(() =>
    interpolate(scale.value, [0, 1], [1.08, 0.95])
  );

  const secondOptionScale = useDerivedValue(() =>
    interpolate(scale.value, [0, 1], [0.95, 1.08])
  );

  // Animated styles
  const highlightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activePosition.value }, { scale: 1.08 }],
    opacity: 0.9,
    backgroundColor: "#3498db",
    width: interpolate(
      offset.value,
      [0, 50, 100],
      [width * 0.4, width * 0.35, width * 0.4]
    ),
    shadowOpacity: withSpring(0.3),
    shadowRadius: withSpring(10),
  }));

  const defaultCardStyle = useAnimatedStyle(() => ({
    width: "40%",
    transform: [{ scale: firstOptionScale.value }],
    opacity: interpolate(offset.value, [100, 0], [0.7, 1]),
  }));

  const altCardStyle = useAnimatedStyle(() => ({
    width: "40%",
    transform: [{ scale: secondOptionScale.value }],
    opacity: interpolate(offset.value, [0, 100], [0.7, 1]),
  }));

  // Update animation when alt prop changes
  useEffect(() => {
    const config = { damping: 15, stiffness: 300 };
    offset.value = withSpring(alt ? 100 : 0, config);
    scale.value = withTiming(alt ? 1 : 0, { duration: 300 });
  }, [alt, offset, scale]);

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Animated.View style={[styles.highlight, highlightStyle]} />

        <Animated.View style={defaultCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={styles.altCard}
          >
            <LayoutVisualizer
              layout={getPlayerLayout({ playerCount, alt: false })}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={altCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={styles.altCard}
          >
            <LayoutVisualizer
              layout={getPlayerLayout({ playerCount, alt: true })}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

/**
 * Component to visualize a player icon
 */
const PlayerIcon = ({ style, ...props }: ViewProps) => (
  <View style={[styles.playerIconContainer, style]} {...props}>
    <View>
      <Ionicons name="person" size={28} color="#2c3e50" />
    </View>
  </View>
);

/**
 * Component to visualize a layout configuration
 */
const LayoutVisualizer = ({ layout }: { layout: number[] }) => (
  <View style={styles.iconLayoutContainer}>
    {/* Left section */}
    {!!layout[0] && (
      <Rotator
        style={{ flex: 1, borderRightWidth: 0.5 }}
        direction={Direction.left}
      >
        {Array.from({ length: layout[0] }).map((_, index) => (
          <PlayerIcon key={`left-${index}`} />
        ))}
      </Rotator>
    )}

    {/* Middle section (top and bottom) */}
    {!!(layout[1] || layout[2]) && (
      <View style={{ flex: Math.max(layout[1], layout[2]) + 1 }}>
        {!!layout[2] && (
          <Rotator
            direction={Direction.up}
            style={{ flex: 1, borderBottomWidth: 0.5 }}
          >
            {Array.from({ length: layout[2] }).map((_, index) => (
              <PlayerIcon
                key={`up-${index}`}
                style={{ borderRightWidth: 0.5 }}
              />
            ))}
          </Rotator>
        )}
        {layout[1] && (
          <Rotator
            direction={Direction.down}
            style={{ flex: 1, borderTopWidth: 0.5 }}
          >
            {Array.from({ length: layout[1] }).map((_, index) => (
              <PlayerIcon
                key={`down-${index}`}
                style={{ borderLeftWidth: 0.5 }}
              />
            ))}
          </Rotator>
        )}
      </View>
    )}

    {/* Right section */}
    {!!layout[3] && (
      <Rotator
        direction={Direction.right}
        style={{ flex: 1, borderLeftWidth: 0.5 }}
      >
        {Array.from({ length: layout[3] }).map((_, index) => (
          <PlayerIcon key={`right-${index}`} />
        ))}
      </Rotator>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  altContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 10,
    gap: width * 0.1,
  },
  altCard: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    position: "absolute",
    width: "43%",
    height: "110%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 0,
  },
  playerIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#1a1a1a",
  },
  rotatorStyle: {
    width: "100%",
    height: "100%",
  },
  iconLayoutContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
});

export default AltSelector;
