import { create } from "zustand";
import { CommanderStore, gameLayout, Player } from "./types";
import { getPlayerLayout } from "./playerLayouts";
import { STARTING_LIFE_TOTAL, TIME_TO_RESET_DELTA } from "@/constants/game";

// helper to immutably update a single player object
const updatePlayer = (
  state: CommanderStore,
  playerId: number,
  updates: Partial<Player>
): CommanderStore => ({
  ...state,
  players: {
    ...state.players,
    [playerId]: {
      ...state.players[playerId],
      ...updates,
    },
  },
});

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
      poison: 0,
      energy: 0,
      experience: 0,
    };

    for (let j = 1; j <= numPlayers; j++) {
      if (j !== i) players[i].Cdmg[j] = [0, 0];
    }
  }
  return players;
};

const GameStore = create<CommanderStore>((set, get) => {
  const timers: Record<number, NodeJS.Timeout> = {};

  const clearAllTimers = () => {
    for (const id of Object.keys(timers)) {
      clearTimeout(timers[Number(id)]);
      delete timers[Number(id)];
    }
  };

  /**
   * Resets the delta of a player after a certain amount of time
   * and adds the current delta to the player's history.
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

  const clampCdmg = (value: number) => {
    return Math.min(21, Math.max(0, value));
  };

  const clampPoison = (value: number) => {
    return Math.max(0, value);
  };

  const clampPositive = (value: number) => {
    return Math.max(0, value);
  };

  return {
    players: generatePlayers(4), // 🟢 Default to 4 players or set dynamically later
    numPlayers: 4,
    gameLayout: [0, 2, 2, 0],
    monarchPlayerId: null,
    initiativePlayerId: null,
    showMonarchBar: false,
    showInitiativeBar: false,
    startingPlayerId: null,
    setStartingPlayerId: (id) => set({ startingPlayerId: id }),
    setNumPlayers: ({
      playerCount,
      alt,
    }: {
      playerCount: number;
      alt: boolean;
    }) => {
      const newLayout = getPlayerLayout({ playerCount: playerCount || 4, alt });
      if (newLayout.join("") === get().gameLayout.join("")) return;
      clearAllTimers();
      set(() => ({
        gameLayout: newLayout,
        numPlayers: playerCount,
        players: generatePlayers(playerCount),
        monarchPlayerId: null,
        initiativePlayerId: null,
        showMonarchBar: false,
        showInitiativeBar: false,
        startingPlayerId: null,
      }));
    },

    incrementLife: ({ playerId, value }) =>
      set((state) => {
        scheduleDeltaReset({ playerId });
        return updatePlayer(state, playerId, {
          lTotal: state.players[playerId].lTotal + value,
          delta: state.players[playerId].delta + value,
        });
      }),

    setLife: ({ playerId, newLife }) =>
      set((state) => {
        const delta = newLife - state.players[playerId].lTotal;
        scheduleDeltaReset({ playerId });
        return updatePlayer(state, playerId, {
          lTotal: newLife,
          delta,
        });
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

        let updated: Partial<Player> = {};

        if (player.chain) {
          // Checks if CDMG is linked to life total
          updated.lTotal = player.lTotal - value;
          updated.delta = player.delta - value;
          scheduleDeltaReset({ playerId, timer: 500 });
        }

        player.Cdmg[attackerId][opponentIdx] = newCdmgValue;
        updated.Cdmg = player.Cdmg;

        return updatePlayer(state, playerId, updated);
      });
    },
    resetGame: () => {
      clearAllTimers();
      set((state) => ({
        ...state,
        players: generatePlayers(state.numPlayers),
        monarchPlayerId: null,
        initiativePlayerId: null,
        showMonarchBar: false,
        showInitiativeBar: false,
        startingPlayerId: null,
      }));
    },

    damageAllOponents: ({ playerId, value }) =>
      set((state) => {
        let next = state;
        for (const id in state.players) {
          const pID = Number(id);
          if (pID !== playerId) {
            scheduleDeltaReset({ playerId: pID });
            next = updatePlayer(next, pID, {
              lTotal: next.players[pID].lTotal + value,
              delta: next.players[pID].delta + value,
            });
          }
        }
        return next;
      }),

    togglePlayerChain: (playerId: number) =>
      set((state) =>
        updatePlayer(state, playerId, {
          chain: !state.players[playerId].chain,
        })
      ),

    incrementPoison: ({ playerId, value }) =>
      set((state) => {
        const player = state.players[playerId];
        const poison = clampPoison(player.poison + value);
        if (poison === player.poison) return state;

        return updatePlayer(state, playerId, { poison });
      }),

    incrementEnergy: ({ playerId, value }) =>
      set((state) => {
        const player = state.players[playerId];
        const energy = clampPositive(player.energy + value);
        if (energy === player.energy) return state;

        return updatePlayer(state, playerId, { energy });
      }),

    incrementExperience: ({ playerId, value }) =>
      set((state) => {
        const player = state.players[playerId];
        const experience = clampPositive(player.experience + value);
        if (experience === player.experience) return state;

        return updatePlayer(state, playerId, { experience });
      }),

    claimMonarch: (playerId: number) =>
      set((state) => ({
        ...state,
        monarchPlayerId: playerId,
      })),

    claimInitiative: (playerId: number) =>
      set((state) => ({
        ...state,
        initiativePlayerId: playerId,
      })),

    toggleMonarchBar: (playerId: number) =>
      set((state) => {
        const showMonarchBar = !state.showMonarchBar;

        return {
          ...state,
          showMonarchBar,
          monarchPlayerId: showMonarchBar ? playerId : null,
        };
      }),

    toggleInitiativeBar: (playerId: number) =>
      set((state) => {
        const showInitiativeBar = !state.showInitiativeBar;

        return {
          ...state,
          showInitiativeBar,
          initiativePlayerId: showInitiativeBar ? playerId : null,
        };
      }),

    proliferate: (playerId: number) =>
      set((state) => {
        let next = state;

        // Increment energy and experience for the current player only if they already have at least 1
        const current = next.players[playerId];
        next = updatePlayer(next, playerId, {
          energy: current.energy > 0 ? clampPositive(current.energy + 1) : current.energy,
          experience: current.experience > 0 ? clampPositive(current.experience + 1) : current.experience,
        });

        // Increment poison for every other player that already has at least 1
        for (const id in next.players) {
          const pID = Number(id);
          if (pID === playerId) continue;
          const p = next.players[pID];
          if (p.poison > 0) {
            next = updatePlayer(next, pID, { poison: clampPoison(p.poison + 1) });
          }
        }

        return next;
      }),

    undoProliferate: (playerId: number) =>
      set((state) => {
        let next = state;

        // Reverse energy and experience for the current player if they have at least 1
        const current = next.players[playerId];
        next = updatePlayer(next, playerId, {
          energy: current.energy > 0 ? clampPositive(current.energy - 1) : current.energy,
          experience: current.experience > 0 ? clampPositive(current.experience - 1) : current.experience,
        });

        // Reverse poison for every other player that has at least 1
        for (const id in next.players) {
          const pID = Number(id);
          if (pID === playerId) continue;
          const p = next.players[pID];
          if (p.poison > 0) {
            next = updatePlayer(next, pID, { poison: clampPoison(p.poison - 1) });
          }
        }

        return next;
      }),
  };
});

export default GameStore;
