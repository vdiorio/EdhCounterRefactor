import { StyleSheet, useColorScheme, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import GameStore from "@/store/GameStore";
import LayoutGenerator from "@/components/LayoutGenerator/LayoutGenerator";
import PlayerBox from "@/components/PlayerBox/PlayerBox";

const AppColors = {
  dark: {
    text: "#e0e0e0",
    background: "#121212",
  },
  light: {
    text: "#121212",
    background: "#e0e0e0",
  },
};

export default function Game() {
  const params = useGlobalSearchParams();
  const { alt, playerCount } = {
    alt: params.alternative === "v",
    playerCount: parseInt(String(params.playerCount) || "4"),
  };
  const colorScheme = useColorScheme() || "dark";
  const colors = colorScheme === "dark" ? AppColors.dark : AppColors.light;

  const setNumberOfPlayers = GameStore((state) => state.setNumPlayers);

  setNumberOfPlayers({ playerCount, alt });
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LayoutGenerator component={PlayerBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  altContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  altCard: {
    width: "40%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
