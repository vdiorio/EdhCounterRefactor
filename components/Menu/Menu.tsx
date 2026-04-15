import React, { useState } from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import AppModal from "@/components/ui/AppModal";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import GameStore from "@/store/GameStore";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import useAppColors from "@/hooks/useAppColors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useStartingPlayer } from "@/hooks/useStartingPlayer";
import { useTranslation } from 'react-i18next';

export default function Menu(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const resetGame = GameStore((s) => s.resetGame);
  const colors = useAppColors();
  const { chooseStartingPlayer } = useStartingPlayer();

  const [menuVisible, setMenuVisible] = useState(false);

  const screen = ScreenStore((state) => state.screen);
  const setScreen = ScreenStore((state) => state.setScreen);

  const confirmAndGoBack = () => {
    Alert.alert(t('alert_back_title'), t('alert_back_message'), [
      { text: t('alert_cancel'), style: "cancel" },
      {
        text: t('alert_yes'),
        onPress: () => {
          setScreen({ screen: Screen.main });
          setMenuVisible(false);
          router.back();
        },
      },
    ]);
  };

  const confirmAndReset = () => {
    Alert.alert(t('alert_reset_title'), t('alert_reset_message'), [
      { text: t('alert_cancel'), style: "cancel" },
      {
        text: t('alert_yes'),
        onPress: () => {
          resetGame();
          setMenuVisible(false);
        },
      },
    ]);
  };

  const handleChooseStartingPlayer = () => {
    setMenuVisible(false);
    chooseStartingPlayer();
  };

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
          accessibilityLabel={t('menu_open')}
        >
          <Ionicons name="construct" size={26} color={colors.text} />
        </TouchableOpacity>
      </Animated.View>
      <AppModal visible={menuVisible} onClose={() => setMenuVisible(false)} title={t('menu_title')}>
        <TouchableOpacity style={localStyles.modalButton} onPress={handleChooseStartingPlayer}>
          <Text style={localStyles.modalButtonText}>{t('menu_choose_starting')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.modalButton} onPress={confirmAndReset}>
          <Text style={localStyles.modalButtonText}>{t('menu_reset_game')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.modalButton} onPress={confirmAndGoBack}>
          <Text style={localStyles.modalButtonText}>{t('menu_back_to_menu')}</Text>
        </TouchableOpacity>
      </AppModal>
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
});
