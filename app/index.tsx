import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
} from "react-native";
import { useState, useEffect } from "react";
import WheelPicker from "react-native-wheely";
import { Link } from "expo-router";
import AltSelector from "@/components/AltOptions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Magic: The Gathering color identity-inspired palette
const MTGColors = {
  dark: {
    background: "#121212",
    surface: "#1E1E1E",
    primary: "#E6C547", // Gold for UI elements
    secondary: "#9F2B68", // Red/Purple mix (like Rakdos)
    accent: "#264653", // Blue/Green mix (like Simic)
    text: "#F5F5F5",
    subtext: "#AAAAAA",
    border: "#333333",
    card: {
      selected: "#3A3311", // Darker gold
      unselected: "#2A2A2A",
    },
  },
  light: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    primary: "#D4AF37", // Gold for UI elements
    secondary: "#7B2CBF", // Purple (like Dimir)
    accent: "#388E3C", // Green (like Selesnya)
    text: "#121212",
    subtext: "#555555",
    border: "#DDDDDD",
    card: {
      selected: "#FFF8E1",
      unselected: "#EEEEEE",
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
  const colors = colorScheme === "dark" ? MTGColors.dark : MTGColors.light;

  const [fontsLoaded] = useFonts({
    BelerenBold: require("../assets/fonts/Beleren-Bold.ttf"), // You'll need to add this font
    MPlantin: require("../assets/fonts/MPlantin.ttf"), // You'll need to add this font
  });

  const handleSelectionChange = (index: number) => {
    setSelected(index);
    setAlternative("f");
  };

  const scaleFunction = (x: number) => {
    return 0.6 * x; // Slightly larger for better visibility
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[
        colors.background,
        colorScheme === "dark" ? "#0A0A0A" : "#E5E5E5",
      ]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.primary, fontFamily: "BelerenBold" },
          ]}
        >
          ARCANE BATTLEFIELD
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: colors.subtext, fontFamily: "MPlantin" },
          ]}
        >
          Life Counter & Combat Tracker
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, fontFamily: "BelerenBold" },
            ]}
          >
            SELECT PLAYERS
          </Text>
          <View
            style={[
              styles.wheelContainer,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <WheelPicker
              options={options}
              selectedIndex={selected}
              onChange={handleSelectionChange}
              scaleFunction={scaleFunction}
              visibleRest={2}
              itemTextStyle={{
                fontSize: 22,
                fontFamily: "MPlantin",
                color: colors.text,
              }}
              selectedTextStyle={{
                backgroundColor: colors.primary,
                fontFamily: "BelerenBold",
                fontSize: 24,
              }}
              itemHeight={45}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, fontFamily: "BelerenBold" },
            ]}
          >
            SELECT LAYOUT
          </Text>
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
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              {
                backgroundColor: pressed ? colors.secondary : colors.primary,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            {({ pressed }) => (
              <View style={styles.buttonContent}>
                <Ionicons
                  name="play"
                  size={24}
                  color={pressed ? colors.surface : colors.background}
                />
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: pressed ? colors.surface : colors.background,
                      fontFamily: "BelerenBold",
                    },
                  ]}
                >
                  BEGIN BATTLE
                </Text>
              </View>
            )}
          </Pressable>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            { color: colors.subtext, fontFamily: "MPlantin" },
          ]}
        >
          Designed for planeswalkers, by planeswalkers
        </Text>
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
    fontSize: 28,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  wheelContainer: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 10,
  },
  altContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    width: "80%",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
});
