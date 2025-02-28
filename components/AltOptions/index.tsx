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

interface Props {
  onChange: (value: boolean) => void;
  playerCount: number;
  alt: boolean;
  colors: any;
}

// Configuration for player arrangements
type PlayerArrangement = {
  standard: JSX.Element;
  alternative?: JSX.Element;
};

const AltSelector = ({ onChange, playerCount, alt }: Props) => {
  const { width } = Dimensions.get("window");
  const offset = useSharedValue<number>(alt ? 1 : 0);

  const activePosition = useDerivedValue(() => {
    // Interpolate position for smoother movement
    const position = interpolate(
      offset.value,
      [0, 1],
      [width * 0.005, width * 0.45],
      Extrapolate.CLAMP
    );

    return withSpring(position, {
      damping: 15,
      stiffness: 100,
    });
  });

  // Scale effect for the active layout
  const activeScale = useDerivedValue(() => {
    return withSpring(1.08);
  });

  // Opacity for inactive layout
  const inactiveOpacity = useDerivedValue(() => {
    return withSpring(0.7);
  });

  // Animated style for the highlight effect
  const highlightStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: activePosition.value },
      {
        scale: activeScale.value,
      },
    ],
    opacity: 0.9,
    backgroundColor: "#3498db",
    shadowOpacity: withSpring(0.3),
    shadowRadius: withSpring(10),
  }));

  // Animated styles for the cards
  const firstCardStyle = useAnimatedStyle(() => ({
    width: "40%", // Fixed width to ensure correct sizing
    transform: [
      {
        scale: interpolate(
          offset.value,
          [0, 0.5, 0],
          [activeScale.value, 0.95, activeScale.value]
        ),
      },
    ],
    opacity: interpolate(offset.value, [1, 0], [inactiveOpacity.value, 1]),
  }));

  const secondCardStyle = useAnimatedStyle(() => ({
    width: "40%", // Fixed width to ensure correct sizing
    transform: [
      {
        scale: interpolate(
          offset.value,
          [1, 0.5, 1],
          [activeScale.value, 0.95, activeScale.value]
        ),
      },
    ],
    opacity: interpolate(offset.value, [0, 1], [inactiveOpacity.value, 1]),
  }));

  const handleChange = (value: boolean) => {
    onChange(value);
  };

  useEffect(() => {
    offset.value = alt ? 1 : 0;
  }, [alt]);

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Animated.View style={[styles.highlight, highlightStyle]} />
        {getPlayerArrangement(
          playerCount,
          handleChange,
          firstCardStyle,
          secondCardStyle
        )}
      </View>
    </View>
  );
};

// Utility function to render a player icon
const PlayerIcon = ({
  rotation = 0,
  size = 30,
}: {
  rotation?: number;
  size?: number;
}) => (
  <View>
    <Ionicons name="person" size={size} rotation={rotation} color="#2c3e50" />
  </View>
);

// Generate the player arrangements based on player count
const getPlayerArrangement = (
  playerCount: number,
  onChange: (value: boolean) => void,
  firstCardStyle: any,
  secondCardStyle: any
): JSX.Element => {
  const s = playerContainerStyles;
  const arrangements: Record<number, PlayerArrangement> = {
    2: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[styles.iconContainer, s.w50, s.h100]}>
              <PlayerIcon rotation={90} />
            </View>
            <View style={[styles.iconContainer, s.w50, s.h100]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
    3: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View
              style={[
                s.w65,
                s.h100,
                {
                  flexDirection: "column",
                  alignItems: "center",
                },
              ]}
            >
              <View style={[styles.iconContainer, s.h50, s.w100]}>
                <View>
                  <PlayerIcon rotation={180} />
                </View>
              </View>
              <View style={[styles.iconContainer, s.h50, s.w100]}>
                <View>
                  <PlayerIcon />
                </View>
              </View>
            </View>
            <View style={[s.w35, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
      alternative: (
        <Animated.View style={secondCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w100, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={0} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
    4: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
      alternative: (
        <Animated.View style={secondCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w25, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={90} />
            </View>
            <View style={s.w50}>
              <View style={[s.w100, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={180} />
              </View>
              <View style={[s.w100, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={0} />
              </View>
            </View>
            <View style={[s.w25, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
    5: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View
              style={[
                s.w75,
                s.h100,
                {
                  flexDirection: "row",
                  flexWrap: "wrap",
                },
              ]}
            >
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={180} />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={180} />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon />
              </View>
            </View>
            <View style={[s.w25, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
      alternative: (
        <Animated.View style={secondCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={0} />
            </View>
            <View style={[s.w50, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={0} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
    6: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(false)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon rotation={180} />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon />
            </View>
            <View style={[s.w33, s.h50, styles.iconContainer]}>
              <PlayerIcon />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
      alternative: (
        <Animated.View style={secondCardStyle}>
          <TouchableOpacity
            onPress={() => onChange(true)}
            style={[styles.altCard, { flexDirection: "row" }]}
          >
            <View style={[s.w25, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={90} />
            </View>
            <View
              style={[
                s.w50,
                s.h100,
                { flexDirection: "row", flexWrap: "wrap" },
              ]}
            >
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={180} size={24} />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={180} size={24} />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={0} size={24} />
              </View>
              <View style={[s.w50, s.h50, styles.iconContainer]}>
                <PlayerIcon rotation={0} size={24} />
              </View>
            </View>
            <View style={[s.w25, s.h100, styles.iconContainer]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
    1: {
      standard: (
        <Animated.View style={firstCardStyle}>
          <TouchableOpacity
            style={styles.altCard}
            onPress={() => onChange(false)}
          >
            <View style={[styles.iconContainer, s.h100, s.w100]}>
              <PlayerIcon rotation={-90} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
      alternative: (
        <Animated.View style={secondCardStyle}>
          <TouchableOpacity
            style={styles.altCard}
            onPress={() => onChange(true)}
          >
            <View style={[styles.iconContainer, s.h100, s.w100]}>
              <PlayerIcon />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ),
    },
  };

  // Get layout configuration based on player count (or default to 1)
  const layout = arrangements[playerCount] || arrangements[1];

  // Return both standard and alternative layouts
  return (
    <>
      {layout.standard}
      {layout.alternative}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  altContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  altCard: {
    width: "100%", // This ensures it fills the parent Animated.View which now has 40% width
    height: "100%",
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    overflow: "hidden",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(240,240,240,0.5)",
  },
  highlight: {
    position: "absolute",
    width: "44%",
    height: "110%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: -1,
  },
});

export default AltSelector;
