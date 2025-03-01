import playerContainerStyles from "@/app/game/(number)/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import LayoutGenerator from "../../app/game/LayoutGenerator";
import { getPlayerLayout } from "@/store/playerLayouts";
import Rotator from "../Rotator";
import { Direction } from "../types";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface Props {
  onChange: (value: boolean) => void;
  playerCount: number;
  alt: boolean;
  colors: any;
}

const { width } = Dimensions.get("window");

const AltSelector = ({ onChange, playerCount, alt }: Props) => {
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

  const fScale = useDerivedValue(() =>
    interpolate(scale.value, [0, 1], [1.08, 0.95])
  );

  const sScale = useDerivedValue(() =>
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
    transform: [{ scale: fScale.value }],
    opacity: interpolate(offset.value, [100, 0], [0.7, 1]),
  }));

  const altCardStyle = useAnimatedStyle(() => ({
    width: "40%",
    transform: [{ scale: sScale.value }],
    opacity: interpolate(offset.value, [0, 100], [0.7, 1]),
  }));

  useEffect(() => {
    const config = { damping: 15, stiffness: 300 };
    offset.value = withSpring(alt ? 100 : 0, config);
    scale.value = withTiming(alt ? 1 : 0, { duration: 300 });
  }, [alt]);

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Animated.View style={[styles.highlight, highlightStyle]} />
        <Animated.View style={defaultCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={styles.altCard}
          >
            <Rotator direction={Direction.right} style={styles.rotatorStyle}>
              <LayoutGenerator
                layout={getPlayerLayout({ playerCount, alt: false })}
                component={PlayerIcon}
              />
            </Rotator>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={altCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={styles.altCard}
          >
            <Rotator direction={Direction.right} style={styles.rotatorStyle}>
              <LayoutGenerator
                layout={getPlayerLayout({ playerCount, alt: true })}
                component={PlayerIcon}
              />
            </Rotator>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

// Utility function to render a player icon
const PlayerIcon = ({ style, ...props }: ViewProps) => (
  <View style={[styles.playerIconContainer, style]} {...props}>
    <View>
      <Ionicons name="person" size={28} color="#2c3e50" />
    </View>
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
    display: "flex",
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
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
});

export default AltSelector;
