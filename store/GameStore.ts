import { create } from "zustand";
import { CommanderStore, gameLayout, Player } from "./types";
import { getPlayerLayout } from "./playerLayouts";

export const STARTING_LIFE_TOTAL = 40;
export const TIME_TO_RESET_DELTA = 2000;

/**
 * Generates an object with player IDs as keys and Player objects as values.
 * @param {number} numPlayers The number of players in the game.
 * @returns {Record<number, Player>} An object with the generated players.
 */
const generatePlayers = (numPlayers: number): Record<number, Player> => {
  const players: Record<number, Player> = {};

  for (let i = 1; i <= numPlayers; i++) {
    players[i] = {
      id: i,
      lTotal: STARTING_LIFE_TOTAL,
      delta: 0,
      history: [],
      Cdmg: {},
      chain: true,
    };

    for (let j = 1; j <= numPlayers; j++) {
      if (j !== i) players[i].Cdmg[j] = [0, 0];
    }
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
  const scheduleDeltaReset = ({
    playerId,
    timer,
  }: {
    playerId: number;
    timer?: number;
  }) => {
    if (timers[playerId]) clearTimeout(timers[playerId]);
    timers[playerId] = setTimeout(() => {
      set((state) => {
        const player = state.players[playerId];

        if (player.delta === 0) return {}; // No change needed

        return {
          players: {
            ...state.players,
            [playerId]: {
              ...player,
              history: [...player.history, player.delta], // push delta
              delta: 0, // reset delta
            },
          },
        };
      });
    }, timer || TIME_TO_RESET_DELTA);
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

  const clampCdmg = (value: number) => {
    return Math.min(21, Math.max(0, value));
  };

  return {
    players: generatePlayers(4), // 🟢 Default to 4 players or set dynamically later
    numPlayers: 4,
    deadPlayers: [],
    alivePlayers: [],
    gameLayout: [0, 2, 2, 0],
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

    incrementLife: ({ playerId, value }) =>
      set((state) => {
        const player = state.players[playerId];
        scheduleDeltaReset({ playerId });
        return {
          players: {
            ...state.players,
            [playerId]: {
              ...player,
              lTotal: player.lTotal + value,
              delta: player.delta + value,
            },
          },
        };
      }),

    setLife: ({ playerId, newLife }) =>
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        player.delta = newLife - player.lTotal;
        player.lTotal = newLife;
        scheduleDeltaReset({ playerId });
        return newState;
      }),

    dealCommanderDamage: ({
      playerId,
      attackerId,
      value,
      partner: isPartner,
    }) => {
      const opponentIdx = isPartner ? 1 : 0;
      return set((state) => {
        const player = { ...state.players[playerId] };
        const actualValue = player.Cdmg[attackerId][opponentIdx];
        const newCdmgValue = clampCdmg(actualValue + value);
        if (newCdmgValue === actualValue) return state;

        if (player.chain) {
          // Checks if CDMG is linked to life total
          player.lTotal -= value;
          player.delta -= value;
          scheduleDeltaReset({ playerId, timer: 500 });
        }

        player.Cdmg[attackerId][opponentIdx] = newCdmgValue;
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: { ...player },
          },
        };
      });
    },
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
          const pID = Number(id);
          if (pID !== playerId) {
            newState.players[pID].lTotal += value;
            newState.players[pID].delta += value;
            scheduleDeltaReset({ playerId: pID });
          }
        }
        return newState;
      }),

    togglePlayerChain: (playerId: number) =>
      set((state) => {
        let newState = { ...state };
        const player = newState.players[playerId];
        player.chain = !player.chain;
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: { ...player },
          },
        };
      }),
  };
});

export default GameStore;
