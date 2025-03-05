import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rotator from "@/components/Rotator/Rotator";
import { Direction } from "@/components/types";

/**
 * Component to visualize a player icon
 */
const PlayerIcon: FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.playerIconContainer, style]} {...props}>
    <View>
      <Ionicons name="person" size={28} color="#2c3e50" />
    </View>
  </View>
);

interface LayoutVisualizerProps {
  layout: number[];
}

/**
 * Component to visualize a layout configuration
 */
export const LayoutVisualizer: FC<LayoutVisualizerProps> = ({ layout }) => (
  <View style={styles.iconLayoutContainer}>
    {/* Left section */}
    {!!layout[0] && (
      <Rotator
        style={{ flex: 1, borderRightWidth: 0.5 }}
        direction={Direction.left}
      >
        {Array.from({ length: layout[0] }).map((_, index) => (
          <PlayerIcon key={`left-${index}`} />
        ))}
      </Rotator>
    )}

    {/* Middle section (top and bottom) */}
    {!!(layout[1] || layout[2]) && (
      <View style={{ flex: Math.max(layout[1], layout[2]) + 1 }}>
        {!!layout[2] && (
          <Rotator
            direction={Direction.up}
            style={{ flex: 1, borderBottomWidth: 0.5 }}
          >
            {Array.from({ length: layout[2] }).map((_, index) => (
              <PlayerIcon
                key={`up-${index}`}
                style={{ borderRightWidth: 0.5 }}
              />
            ))}
          </Rotator>
        )}
        {layout[1] && (
          <Rotator
            direction={Direction.down}
            style={{ flex: 1, borderTopWidth: 0.5 }}
          >
            {Array.from({ length: layout[1] }).map((_, index) => (
              <PlayerIcon
                key={`down-${index}`}
                style={{ borderLeftWidth: 0.5 }}
              />
            ))}
          </Rotator>
        )}
      </View>
    )}

    {/* Right section */}
    {!!layout[3] && (
      <Rotator
        direction={Direction.right}
        style={{ flex: 1, borderLeftWidth: 0.5 }}
      >
        {Array.from({ length: layout[3] }).map((_, index) => (
          <PlayerIcon key={`right-${index}`} />
        ))}
      </Rotator>
    )}
  </View>
);

const styles = StyleSheet.create({
  iconLayoutContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  playerIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#1a1a1a",
  },
});

export default LayoutVisualizer;
