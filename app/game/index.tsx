import { StyleSheet, useColorScheme, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import LayoutGenerator from "./LayoutGenerator";
import { getPlayerLayout } from "@/store/playerLayouts";
import PlayerScreen from "@/components/PlayerScreen";
import useGameStore from "@/store/GameStore";

const AppColors = {
  dark: {
    text: "#e0e0e0",
    background: "#1a1a1a",
  },
  light: {
    text: "#1a1a1a",
    background: "#e0e0e0",
  },
};

export default function Game() {
  const { playerCount, alternative } = useGlobalSearchParams();
  const numPlayers = playerCount ? Number(playerCount) : 4;
  const alt = alternative ? alternative === "v" : false;
  const colorScheme = useColorScheme() || "dark";
  const colors = colorScheme === "dark" ? AppColors.dark : AppColors.light;

  const gameStore = useGameStore();
  gameStore.getState().setNumPlayers(numPlayers);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LayoutGenerator
        layout={getPlayerLayout({ playerCount: numPlayers, alt })}
        component={PlayerScreen}
        game
      />
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
    borderWidth: 0.5,
    borderColor: "#1a1a1a",
  },
});
