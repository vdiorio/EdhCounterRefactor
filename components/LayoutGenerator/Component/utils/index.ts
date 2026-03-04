/**
 * Calculates player IDs based on the layout configuration
 */
export function getPlayerIds(layout: number[], pieceIndex: number): number[] {
  if (!layout || pieceIndex >= layout.length) return [];
  const players = layout[pieceIndex];
  const startPlayerId =
    layout.slice(0, pieceIndex).reduce((a, b) => a + b, 0) + 1;
  return Array.from({ length: players }, (_, index) => startPlayerId + index);
}

/**
 * Determine the facing direction for a given player based on layout index.
 * Returns one of the cardinal `Direction` values used in rotation components.
 */
import { Direction } from "@/components/types";

export function getPlayerDirection(
  layout: number[],
  playerId: number
): Direction {
  let playerIndex = -1;
  layout.reduce((acc, curr, i) => {
    if (playerIndex === -1 && playerId <= acc + curr) playerIndex = i;
    return acc + curr;
  }, 0);
  switch (playerIndex) {
    case 0:
      return Direction.up;
    case 1:
      return Direction.right;
    case 2:
      return Direction.left;
    default:
      return Direction.down;
  }
}
