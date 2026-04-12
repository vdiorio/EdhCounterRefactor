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

export const selectPlayerPoison = (playerId: number) =>
  (state: CommanderStore): number => state.players[playerId].poison;

export const selectPlayerEnergy = (playerId: number) =>
  (state: CommanderStore): number => state.players[playerId].energy;

export const selectPlayerExperience = (playerId: number) =>
  (state: CommanderStore): number => state.players[playerId].experience;

export const selectMonarchPlayerId = (state: CommanderStore): number | null =>
  state.monarchPlayerId;

export const selectInitiativePlayerId = (
  state: CommanderStore
): number | null => state.initiativePlayerId;

export const selectShowMonarchBar = (state: CommanderStore): boolean =>
  state.showMonarchBar;

export const selectShowInitiativeBar = (state: CommanderStore): boolean =>
  state.showInitiativeBar;

// selectors for StyleStore
type StyleStateSlice = {
  playerColors: string[];
};

export const selectPlayerColors = (state: StyleStateSlice): string[] =>
  state.playerColors;

export const selectPlayerColor = (playerId: number) =>
  (state: StyleStateSlice): string => state.playerColors[playerId - 1];

export const selectPlayerColorWithAlpha = (
  playerId: number,
  alpha: string = "FF"
) => (state: StyleStateSlice): string => `${state.playerColors[playerId - 1]}${alpha}`;
