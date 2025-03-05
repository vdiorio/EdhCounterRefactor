import { create } from "zustand";
import { CommanderStore, gameLayout, Player } from "./types";
import { getPlayerLayout } from "./playerLayouts";

const STARTING_VALUE = 40;
const TIME_TO_RESET_DELTA = 2000;

/**
 * Generates an object with player IDs as keys and Player objects as values.
 * @param {number} numPlayers The number of players in the game.
 * @returns {Record<number, Player>} An object with the generated players.
 */
const generatePlayers = (numPlayers: number): Record<number, Player> => {
  const createCdmg = (playerId: number): Record<number, number> => {
    const Cdmg: Record<number, number> = {};
    for (let i = 1; i <= numPlayers; i++) {
      if (i !== playerId) Cdmg[i] = 0;
    }
    return Cdmg;
  };

  const players: Record<number, Player> = {};
  for (let i = 1; i <= numPlayers; i++) {
    players[i] = {
      id: i,
      lTotal: STARTING_VALUE,
      delta: 0,
      history: [],
      Cdmg: createCdmg(i),
    };
  }
  return players;
};

const GameStore = create<CommanderStore>((set, get) => {
  const timers: Record<number, NodeJS.Timeout> = {};

  /**
   * Resets the delta of a player after a certain amount of time
   * and adds the current delta to the player's history.
   * @param {number} playerId The ID of the player to reset the delta for.
   * @returns {void}
   */
  const timerResetDelta = (playerId: number) => {
    if (timers[playerId]) clearTimeout(timers[playerId]);

    timers[playerId] = setTimeout(() => {
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        addToHistory(playerId, player.delta);
        player.delta = 0;
        return newState;
      });
    }, TIME_TO_RESET_DELTA);
  };

  /**
   * Adds a value to a player's history.
   * @param {number} playerId The ID of the player to add to the history of.
   * @param {number} value The value to add to the player's history.
   * @returns {void}
   */
  const addToHistory = (playerId: number, value: number) => {
    set((state) => ({
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          history: [...state.players[playerId].history, value],
        },
      },
    }));
  };

  return {
    players: generatePlayers(4), // 🟢 Default to 4 players or set dynamically later
    numPlayers: 4,
    deadPlayers: [],
    alivePlayers: [],
    gameLayout: [0, 0, 0, 0],
    removePlayerFromLayout: (playerId) => {
      set((state) => ({
        deadPlayers: [...state.deadPlayers, playerId],
        alivePlayers: state.alivePlayers.filter((id) => id !== playerId),
      }));
    },

    setNumPlayers: ({
      playerCount,
      alt,
    }: {
      playerCount: number;
      alt: boolean;
    }) => {
      const newLayout = getPlayerLayout({ playerCount, alt });
      if (newLayout.join("") === get().gameLayout.join("")) return;
      set(() => ({
        gameLayout: newLayout,
        numPlayers: playerCount,
        players: generatePlayers(playerCount),
        deadPlayers: [],
        alivePlayers: Array.from({ length: playerCount }, (_, i) => i + 1),
      }));
    },

    IncrementLife: ({ playerId, value }) =>
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        player.lTotal += value;
        player.delta += value;
        timerResetDelta(playerId);
        return newState;
      }),

    setLife: ({ playerId, newLife }) =>
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        player.delta = newLife - player.lTotal;
        player.lTotal = newLife;
        timerResetDelta(playerId);
        return newState;
      }),

    dealCommanderDamage: ({ playerId, attackerId, value }) =>
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        player.Cdmg[attackerId] += value;
        state.IncrementLife({ playerId, value });
        return newState;
      }),

    resetGame: () =>
      set((state) => ({
        ...state,
        players: generatePlayers(state.numPlayers),
        deadPlayers: [],
        alivePlayers: Array.from({ length: state.numPlayers }, (_, i) => i + 1),
      })),

    damageAllOponents: ({ playerId, value }) =>
      set((state) => {
        let newState = { ...state };
        for (const id in state.players) {
          const nID = Number(id);
          if (nID !== playerId) {
            newState.players[nID].lTotal += value;
            newState.players[nID].delta += value;
            timerResetDelta(nID);
          }
        }
        return newState;
      }),
  };
});

const useGameStore = () => {
  return GameStore;
};

export default useGameStore;
