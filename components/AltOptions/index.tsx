import { useEffect, FC } from "react";
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
import { getPlayerLayout } from "@/store/playerLayouts";
import LayoutVisualizer from "./Components/LayoutVisualizer";
import { useSliderAnimation } from "../ui/Animations/hooks";

// Constants

// Types
export interface AltSelectorProps {
  onChange: (value: boolean) => void;
  playerCount: number;
  alt: boolean;
  colors?: any;
}

/**
 * Component that allows selecting between default and alternative layouts
 */
const AltSelector: FC<AltSelectorProps> = ({ onChange, playerCount, alt }) => {
  const { defaultCardStyle, altCardStyle, highlightStyle } =
    useSliderAnimation(alt);
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

const { width } = Dimensions.get("window");

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
});

export default AltSelector;
