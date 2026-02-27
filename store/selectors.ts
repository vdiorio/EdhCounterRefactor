import { CommanderStore, Player } from "./types";

// selectors for GameStore
export const selectPlayer = (playerId: number) =>
  (state: CommanderStore): Player => state.players[playerId];

export const selectPlayerLife = (playerId: number) =>
  (state: CommanderStore): number => state.players[playerId].lTotal;

export const selectPlayerDelta = (playerId: number) =>
  (state: CommanderStore): number => state.players[playerId].delta;

export const selectPlayerCdmg = (playerId: number) =>
  (state: CommanderStore): Record<number, number[]> =>
    state.players[playerId].Cdmg;

export const selectPlayerChain = (playerId: number) =>
  (state: CommanderStore): boolean => state.players[playerId].chain;

export const selectGameLayout = (state: CommanderStore) => state.gameLayout;

export const selectAlivePlayers = (state: CommanderStore) => state.alivePlayers;

// selectors for StyleStore
export const selectPlayerColor = (playerId: number) => {
  return (state: any): string => state.playerColors[playerId - 1];
};
