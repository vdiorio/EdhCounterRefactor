import React, { useState } from "react";
import { TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import useAppColors from "@/hooks/useAppColors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Menu(): JSX.Element {
  const router = useRouter();
  const resetGame = GameStore((s) => s.resetGame);
  const colors = useAppColors();

  const [menuVisible, setMenuVisible] = useState(false);

  const confirmAndGoBack = () => {
    Alert.alert("Voltar", "Tem certeza que deseja voltar ao menu principal?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          setScreen({ screen: Screen.main });
          setMenuVisible(false);
          router.back()
        },
      },
    ]);
  };

  const confirmAndReset = () => {
    Alert.alert("Resetar jogo", "Tem certeza que deseja resetar o jogo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          resetGame();
          setMenuVisible(false);
        },
      },
    ]);
  };

  const chooseStartingPlayer = () => {
    Alert.alert("Escolher jogador inicial", "Funcionalidade não implementada.");
    setMenuVisible(false);
  };

  const screen = ScreenStore((state) => state.screen);
  const setScreen = ScreenStore((state) => state.setScreen);

  return (
    <>
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        style={localStyles.buttonContainer}
        pointerEvents={screen === Screen.game ? "auto" : "none"}
      >
        <TouchableOpacity
          style={localStyles.centerButton}
          onPress={() => setMenuVisible(true)}
          accessible
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="construct" size={26} color={colors.text} />
        </TouchableOpacity>
      </Animated.View>
      {menuVisible && (
        <TouchableOpacity
          style={localStyles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={localStyles.modalContent}
            activeOpacity={1}
            onPress={() => { /* absorb tap */ }}
          >
            <Text style={[localStyles.modalTitle, { color: colors.text }]}>Opções</Text>
            <TouchableOpacity style={localStyles.modalButton} onPress={chooseStartingPlayer}>
              <Text style={localStyles.modalButtonText}>Escolher jogador inicial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.modalButton} onPress={confirmAndReset}>
              <Text style={localStyles.modalButtonText}>Resetar jogo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.modalButton} onPress={confirmAndGoBack}>
              <Text style={localStyles.modalButtonText}>Voltar ao menu</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
}

const localStyles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    zIndex: 2,
    alignSelf: "center",
    transform: [{ rotate: "90deg" }],
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 24,
  },
  centerButton: {
    backgroundColor: "#000000",
    padding: 6,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#222",
    marginBottom: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
  },
  modalClose: {
    backgroundColor: "#333",
  },
});
