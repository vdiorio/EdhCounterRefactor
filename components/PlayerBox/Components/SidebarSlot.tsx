import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import Animated, { SlideInLeft, SlideOutLeft, runOnJS } from "react-native-reanimated";

import { SideBar } from "@/components/types";
import CdmgSideBar from "./CdmgSideBar";
import HistorySideBar from "./HistorySideBar";
import CountersSideBar from "./CountersSideBar";

interface SidebarSlotProps {
  selectedBar: SideBar | null;
  playerId: number;
}

interface SidebarRenderConfig {
  width: DimensionValue;
  content: React.ReactNode;
}

function renderContent(
  selectedBar: SideBar,
  playerId: number
): SidebarRenderConfig {
  switch (selectedBar) {
    case SideBar.cdmg:
      return {
        width: "30%",
        content: <CdmgSideBar style={styles.sideBar} playerId={playerId} />,
      };
    case SideBar.history:
      return {
        width: "20%",
        content: <HistorySideBar style={styles.sideBar} playerId={playerId} />,
      };
    case SideBar.counters:
    default:
      return {
        width: "26%",
        content: <CountersSideBar style={styles.sideBar} playerId={playerId} />,
      };
  }
}

export default function SidebarSlot({ selectedBar, playerId }: SidebarSlotProps) {
  const [displayedBar, setDisplayedBar] = useState<SideBar | null>(selectedBar);
  const [pendingBar, setPendingBar] = useState<SideBar | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleExitComplete = useCallback(() => {
    setDisplayedBar(pendingBar);
    setPendingBar(null);
    setIsExiting(false);
  }, [pendingBar]);

  useEffect(() => {
    if (selectedBar === displayedBar) {
      return;
    }

    if (!displayedBar) {
      setDisplayedBar(selectedBar);
      return;
    }

    setPendingBar(selectedBar);
    setIsExiting(true);
  }, [selectedBar, displayedBar]);

  const exitingAnimation = useMemo(
    () =>
      SlideOutLeft.duration(50).withCallback((finished) => {
        if (finished) {
          runOnJS(handleExitComplete)();
        }
      }),
    [handleExitComplete]
  );

  if (!displayedBar) {
    return null;
  }

  const { width, content } = renderContent(displayedBar, playerId);

  return (
    <View style={{ overflow: "hidden", width, minWidth: 80, zIndex: 21 }}>
      {!isExiting && (
        <Animated.View
          key={displayedBar}
          style={styles.sideBar}
          entering={SlideInLeft.duration(180)}
          exiting={exitingAnimation}
        >
          {content}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    height: "100%",
    minWidth: 80,
    backgroundColor: "#FFFFFF0a",
    borderWidth: 0,
    borderRightWidth: 0.5,
    borderColor: "#555555",
  },
});