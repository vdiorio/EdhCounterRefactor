import { StyleSheet, View } from "react-native";
import { StrictMode, useEffect, useState } from "react";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { Platform, AppState } from "react-native";

export default function RootLayout() {
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [isSystemStatusBarVisible, setSystemStatusBarVisible] = useState(false);
  const [isSystemNavigationBarVisible, setSystemNavigationBarVisible] =
    useState(false);

  const navigationConfig = async () => {
    if (Platform.OS === "android") {
      await NavigationBar.setVisibilityAsync("hidden");
    }
  };

  useEffect(() => {
    // Oculta a barra de status em Android e iOS
    if (Platform.OS !== "web") {
      setStatusBarHidden(true, "none");
    }
    setSystemStatusBarVisible(false);

    // Configura a barra de navegação no Android
    if (Platform.OS === "android") {
      navigationConfig();

      const navigationBarListener = NavigationBar.addVisibilityListener(
        ({ visibility }) => {
          setSystemNavigationBarVisible(visibility === "visible");
          if (visibility === "visible") {
            navigationConfig();
          }
        }
      );

      const appStateListener = AppState.addEventListener(
        "change",
        (nextAppState) => {
          setSystemNavigationBarVisible(nextAppState !== "active");
          if (nextAppState !== "active") {
            navigationConfig();
          }
        }
      );

      return () => {
        navigationBarListener.remove();
        appStateListener.remove();
      };
    }
  }, []);

  return (
    <StrictMode>
      <View
        style={styles.container}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          if (!isSystemStatusBarVisible && !isSystemNavigationBarVisible) {
            setScreenDimensions({ height, width });
          }
        }}
      >
        <Stack>
          <Stack.Screen name="game/index" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    width: "100%",
    overflow: "hidden",
  },
});
