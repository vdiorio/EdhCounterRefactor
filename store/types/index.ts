export interface Player {
  id: number;
  lTotal: number;
  delta: number;
  history: number[];
  Cdmg: Record<number, number>;
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
}

export interface DamageAllOponentsPayload {
  playerId: number;
  value: number;
}

export interface CommanderStore {
  players: Record<number, Player>;
  numPlayers: number;
  setLife: ({ playerId, newLife }: SetLifePayload) => void;
  IncrementLife: ({ playerId, value }: IncLifePayload) => void;
  dealCommanderDamage: ({
    attackerId,
    playerId,
    value,
  }: DealCommanderDamagePayload) => void;
  resetGame: () => void;
  damageAllOponents: ({ playerId, value }: DamageAllOponentsPayload) => void;
  setNumPlayers: (NUMBER_OF_PLAYERS: number) => void;
}
