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
