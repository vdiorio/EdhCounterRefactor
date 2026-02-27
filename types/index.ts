// Branded types for type safety
export type PlayerId = number & { readonly __brand: "PlayerId" };

export const createPlayerId = (id: number): PlayerId => {
  if (id < 1) throw new Error("PlayerId must be >= 1");
  return id as PlayerId;
};

// Commander Damage: [regularDamage, partnerDamage]
export type CommanderDamage = [number, number];

export type CommanderDamageMap = Record<PlayerId | number, CommanderDamage>;
