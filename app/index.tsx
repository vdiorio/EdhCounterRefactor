import {
  StyleSheet,
  View,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import WheelPicker from "react-native-wheely";
import { Link } from "expo-router";
import AltSelector from "@/components/AltOptions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/ui/Typography";

// New color palette inspired by MTG but more visually appealing for mobile UI
const AppColors = {
  dark: {
    // Deep background with subtle gradient
    background: "#151515",
    backgroundGradient: "#0D0D0D",
    // Card surfaces
    surface: "#222222",
    surfaceAccent: "#2A2A2A",
    // Primary color - vibrant blue (reminiscent of blue mana)
    primary: "#4285F4",
    primaryDark: "#3367D6",
    // Secondary color - vibrant red (reminiscent of red mana)
    secondary: "#EA4335",
    secondaryDark: "#C62828",
    // Accent colors for various UI elements
    accent: {
      green: "#34A853", // Green mana
      white: "#F0F0F0", // White mana
      black: "#121212", // #1a1a1a mana
    },
    // Typography
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    textMuted: "#707070",
    // Border
    border: "#333333",
    // Selection states
    selected: {
      background: "#263238",
      text: "#FFFFFF",
    },
    unselected: {
      background: "#1E1E1E",
      text: "#888888",
    },
  },
  light: {
    // Light background with subtle gradient
    background: "#F5F5F5",
    backgroundGradient: "#E8E8E8",
    // Card surfaces
    surface: "#FFFFFF",
    surfaceAccent: "#F0F0F0",
    // Primary color - vibrant blue (reminiscent of blue mana)
    primary: "#4285F4",
    primaryDark: "#3367D6",
    // Secondary color - vibrant red (reminiscent of red mana)
    secondary: "#EA4335",
    secondaryDark: "#C62828",
    // Accent colors for various UI elements
    accent: {
      green: "#34A853", // Green mana
      white: "#F8F8F8", // White mana
      black: "#212121", // #1a1a1a mana
    },
    // Typography
    text: "#212121",
    textSecondary: "#5F6368",
    textMuted: "#9AA0A6",
    // Border
    border: "#DADCE0",
    // Selection states
    selected: {
      background: "#E8F0FE",
      text: "#1A73E8",
    },
    unselected: {
      background: "#F1F3F4",
      text: "#5F6368",
    },
  },
};

const options = Array.from(new Array(6)).map(
  (_, index) => `${index + 1} Player${!index ? "" : "s"}`
);

export default function GameSelectors() {
  const [selected, setSelected] = useState(3);
  const [alternative, setAlternative] = useState("f");
  const colorScheme = useColorScheme() || "dark";
  const colors = colorScheme === "dark" ? AppColors.dark : AppColors.light;

  const handleSelectionChange = (index: number) => {
    setSelected(index);
    setAlternative("f");
  };

  const scaleFunction = (x: number) => {
    return 0.7 * x; // Slightly larger for better visibility
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundGradient]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Typography style={[styles.title, { color: colors.primary }]}>
          EDH Counter
        </Typography>
        <Typography style={[styles.subtitle, { color: colors.textSecondary }]}>
          Commander Life Tracker
        </Typography>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            SELECT PLAYERS
          </Typography>
          <View
            style={[
              styles.wheelContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <WheelPicker
              options={options}
              selectedIndex={selected}
              onChange={handleSelectionChange}
              scaleFunction={scaleFunction}
              visibleRest={1}
              itemTextStyle={{
                fontSize: 20,
                color: colors.textMuted,
                fontWeight: "400",
              }}
              selectedTextStyle={{
                fontSize: 26,
                color: "#1a1a1a",
                fontWeight: "700",
              }}
              itemHeight={50}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            SELECT LAYOUT
          </Typography>
          <View style={styles.altContainer}>
            <AltSelector
              onChange={(alt) => setAlternative(alt ? "v" : "f")}
              playerCount={selected + 1}
              alt={alternative === "v"}
              colors={colors}
            />
          </View>
        </View>

        <Link
          push
          href={{
            pathname: "/game",
            params: { playerCount: selected + 1, alternative },
          }}
          asChild
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              margin: "auto",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="play" size={24} color={colors.text} />
              <Typography
                style={[
                  styles.buttonText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                START GAME
              </Typography>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "400",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 1,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  wheelContainer: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  altContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    width: "85%",
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
});
