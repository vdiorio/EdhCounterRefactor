import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import GameStore from "@/store/GameStore";
import { StyleSheet, View } from "react-native";

interface Props {
  playerCount: number;
  alt?: boolean;
}

const PlayerGrid = ({ playerCount, alt = false }: Props) => {
  GameStore.getState().setNumPlayers(playerCount);
  const getPlayerDirection = (index: number): Direction => {
    if (alt) {
      // Define a structured alt layout
      const altDirections: Record<number, Direction[]> = {
        4: [Direction.up, Direction.left, Direction.right, Direction.down],
        5: [
          Direction.up,
          Direction.left,
          Direction.right,
          Direction.down,
          Direction.down,
        ],
        6: [
          Direction.up,
          Direction.left,
          Direction.right,
          Direction.left,
          Direction.right,
          Direction.down,
        ],
      };
      return altDirections[playerCount]?.[index] || Direction.right; // Default to right
    }

    // Default alternating layout
    return index % 2 === 0 ? Direction.left : Direction.right;
  };

  const getGridStyles = (index: number) => {
    if (alt) {
      switch (playerCount) {
        case 2:
          return [styles["w-50"], styles["h-100"]];
        case 3:
          return [styles["w-33"], styles["h-100"]];
        case 4:
          return [styles["w-25"], styles["h-50"]];
        case 5:
          return [styles["w-20"], styles["h-50"]];
        case 6:
          return [styles["w-20"], styles["h-33"]];
        default:
          return [styles["w-100"], styles["h-100"]];
      }
    } else {
      switch (playerCount) {
        case 2:
          return [styles["w-50"], styles["h-100"]];
        case 3:
          return [styles["w-33"], styles["h-100"]];
        case 4:
          return [styles["w-25"], styles["h-50"]];
        case 5:
          return [styles["w-20"], styles["h-50"]];
        case 6:
          return [styles["w-20"], styles["h-33"]];
        default:
          return [styles["w-100"], styles["h-100"]];
      }
    }
    return [{}];
  };

  return (
    <View style={styles.screen}>
      {Array.from({ length: playerCount }).map((_, index) => (
        <View key={index} style={getGridStyles(index)}>
          <PlayerScreen
            playerId={index + 1}
            playerDirection={getPlayerDirection(index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  "w-100": {
    width: "100%",
  },
  "h-100": {
    height: "100%",
  },
  "w-50": {
    width: "50%",
  },
  "h-50": {
    height: "50%",
  },
  "w-33": {
    width: "33.33%",
  },
  "h-33": {
    height: "33.33%",
  },
  "w-25": {
    width: "25%",
  },
  "h-25": {
    height: "25%",
  },
  "w-20": {
    width: "20%",
  },
  "h-20": {
    height: "20%",
  },
});

export default PlayerGrid;
