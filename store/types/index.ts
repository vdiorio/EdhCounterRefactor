export interface Player {
  id: number;
  lTotal: number;
  delta: number;
  history: number[];
  Cdmg: Record<number, number[]>;
  chain: boolean;
  poison: number;
  energy: number;
  experience: number;
}

export interface SetLifePayload {
  playerId: number;
  newLife: number;
}

export interface IncLifePayload {
  playerId: number;
  value: number;
}

export interface DealCommanderDamagePayload {
  attackerId: number;
  playerId: number;
  value: number;
  partner?: boolean;
}

export interface DamageAllOponentsPayload {
  playerId: number;
  value: number;
}

export interface IncrementPlayerCounterPayload {
  playerId: number;
  value: number;
}
export type gameLayout = [number, number, number, number];
export interface CommanderStore {
  players: Record<number, Player>;
  numPlayers: number;
  deadPlayers: number[];
  alivePlayers: number[];
  gameLayout: gameLayout;
  monarchPlayerId: number | null;
  initiativePlayerId: number | null;
  showMonarchBar: boolean;
  showInitiativeBar: boolean;
  removePlayerFromLayout: (playerId: number) => void;
  setLife: ({ playerId, newLife }: SetLifePayload) => void;
  incrementLife: ({ playerId, value }: IncLifePayload) => void;
  dealCommanderDamage: ({
    attackerId,
    playerId,
    value,
  }: DealCommanderDamagePayload) => void;
  resetGame: () => void;
  damageAllOponents: ({ playerId, value }: DamageAllOponentsPayload) => void;
  togglePlayerChain: (playerId: number) => void;
  incrementPoison: ({
    playerId,
    value,
  }: IncrementPlayerCounterPayload) => void;
  incrementEnergy: ({
    playerId,
    value,
  }: IncrementPlayerCounterPayload) => void;
  incrementExperience: ({
    playerId,
    value,
  }: IncrementPlayerCounterPayload) => void;
  claimMonarch: (playerId: number) => void;
  claimInitiative: (playerId: number) => void;
  toggleMonarchBar: (playerId: number) => void;
  toggleInitiativeBar: (playerId: number) => void;
  setNumPlayers: ({
    playerCount,
    alt,
  }: {
    playerCount: number;
    alt: boolean;
  }) => void;
}
