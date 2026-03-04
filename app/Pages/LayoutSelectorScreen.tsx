import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import WheelPicker from "react-native-wheely";
import { Link } from "expo-router";
import AltSelector from "@/components/AltOptions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/ui/Typography";
import useAppColors from "@/hooks/useAppColors";

const options = Array.from(new Array(5)).map(
  (_, index) => `${index + 2} Jogadores`
);

export default function GameSelectors() {
  const [selected, setSelected] = useState(2);
  const [alternative, setAlternative] = useState("f");
  const colors = useAppColors();

  const handleSelectionChange = (index: number) => {
    setSelected(index);
    setAlternative("f");
  };

  useEffect(() => {
    console.log("Selected player count:", selected + 1);
  }, [alternative]);

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
          Contador de vida para commander
        </Typography>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            Quantidade de Jogadores
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
                color: "#121212",
                fontWeight: "700",
              }}
              itemHeight={50}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            Layout da mesa
          </Typography>
          <View style={styles.altContainer}>
            <AltSelector
              onChange={(alt) => setAlternative(alt ? "v" : "f")}
              playerCount={selected + 2}
              alt={alternative === "v"}
              colors={colors}
            />
          </View>
        </View>

        <Link
          push
          href={{
            pathname: "/Pages/GameScreen",
            params: { playerCount: selected + 2, alternative },
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
                Iniciar Partida
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
