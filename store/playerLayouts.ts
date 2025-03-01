import { gameLayout } from "./types";

const playerLayouts: { [key: string]: gameLayout } = {
  "1": [0, 0, 0, 1],
  "1alt": [0, 1, 0, 0],
  "2": [1, 0, 0, 1],
  "2alt": [0, 1, 1, 0],
  "3": [0, 1, 1, 1],
  "3alt": [0, 1, 2, 0],
  "4": [0, 2, 2, 0],
  "4alt": [1, 1, 1, 1],
  "5": [0, 2, 2, 1],
  "5alt": [0, 2, 3, 0],
  "6": [0, 3, 3, 0],
  "6alt": [1, 2, 2, 1],
};

export const getPlayerLayout = ({
  playerCount,
  alt,
}: {
  playerCount: number;
  alt: boolean;
}) => {
  return playerLayouts[`${playerCount}${alt ? "alt" : ""}`];
};
