import { StyleSheet, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Direction } from "@/components/types";
import Rotator from "@/components/Rotator";
import useGameStore from "@/store/GameStore";
import { useEffect, useState, useMemo } from "react";

interface Props extends ViewProps {
  layout: number[];
  component: (props: any) => JSX.Element;
  game?: boolean;
}

/**
 * Finds the layout index for a given player ID
 */
const findPlayerInLayout = (playerId: number, layout: number[]): number => {
  let layoutIndex = 0;
  let count = 0;

  for (let i = 0; i < layout.length; i++) {
    if (count + layout[i] >= playerId) {
      layoutIndex = i;
      break;
    }
    count += layout[i];
  }

  return layoutIndex;
};

export default function LayoutGenerator({
  layout,
  style,
  component: Component,
  game = false,
  ...props
}: Props) {
  const deadPlayers = useGameStore()((state) => state.deadPlayers);
  const [alivePlayers, setAlivePlayers] = useState<number[]>(layout);

  // Reset alive players when layout changes
  useEffect(() => {
    setAlivePlayers(layout);
  }, [layout]);

  // Update alive players count when dead players change (only in game mode)
  useEffect(() => {
    if (!game) return;

    setAlivePlayers(
      layout.map((numPlayers, index) => {
        const deadPlayersInLayout = deadPlayers.filter(
          (playerId) => findPlayerInLayout(playerId, layout) === index
        );
        return numPlayers - deadPlayersInLayout.length;
      })
    );
  }, [deadPlayers, game, layout]);

  // Calculate player IDs for each section
  const sectionStartIds = useMemo(() => {
    const top = 1;
    const left = layout[0] + 1;
    const right = left + layout[1];
    const bottom = right + layout[2];

    return { top, left, right, bottom };
  }, [layout]);

  /**
   * Renders components for a specific section
   */
  const renderComponents = (numPlayers: number, startPlayerId: number) => {
    return Array.from({ length: numPlayers }).map((_, index) => {
      const playerId = startPlayerId + index;

      if (game && deadPlayers.includes(playerId)) {
        return null;
      }

      return (
        <Component
          key={`player-${playerId}`}
          playerId={playerId}
          style={styles.componentBorderTop}
        />
      );
    });
  };

  /**
   * Renders the top section of the layout
   */
  const renderTop = () => {
    if (!alivePlayers[0]) return null;

    return (
      <Rotator
        direction={Direction.up}
        style={[styles.vertical, { flex: layout[0] }]}
      >
        {renderComponents(layout[0], sectionStartIds.top)}
      </Rotator>
    );
  };

  /**
   * Renders the middle section (left and right)
   */
  const renderMiddle = () => {
    if (!layout[1] && !layout[2]) return null;

    const flexValue =
      Math.max(alivePlayers[1], alivePlayers[2]) +
      Math.min(alivePlayers[1], alivePlayers[2], 1);

    return (
      <View style={[styles.container, { flex: flexValue }]}>
        {alivePlayers[1] > 0 && (
          <Rotator direction={Direction.left} style={styles.horizontal}>
            {renderComponents(layout[1], sectionStartIds.left)}
          </Rotator>
        )}
        {alivePlayers[2] > 0 && (
          <Rotator direction={Direction.right} style={styles.horizontal}>
            {renderComponents(layout[2], sectionStartIds.right)}
          </Rotator>
        )}
      </View>
    );
  };

  /**
   * Renders the bottom section of the layout
   */
  const renderBottom = () => {
    if (!alivePlayers[3]) return null;

    return (
      <Rotator
        direction={Direction.down}
        style={[styles.vertical, { flex: layout[3] }]}
      >
        {renderComponents(layout[3], sectionStartIds.bottom)}
      </Rotator>
    );
  };

  return (
    <View style={[styles.gameBody, style]} {...props}>
      {renderTop()}
      {renderMiddle()}
      {renderBottom()}
    </View>
  );
}

const styles = StyleSheet.create({
  gameBody: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
  },
  vertical: {
    width: "100%",
    borderWidth: 0,
  },
  horizontal: {
    flex: 1,
  },
  componentBorderTop: {
    borderTopWidth: 1,
  },
});
