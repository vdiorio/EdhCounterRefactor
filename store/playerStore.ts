import { create } from "zustand";

// Interface do estado e ações
export interface PlayerState {
  lifeTotalValue: number;
  delta: number;
  increment: (value: number) => void;
  setValue: (newValue: number) => void;
}

// Variável para armazenar o timer fora do estado
let timer: NodeJS.Timeout | null = null;
const TIME_TO_RESET_DELTA = 2000;
const STARTING_VALUE = 40;

// Função auxiliar para atualizar o estado e configurar o timer
const updateWithTimer = (
  set: (fn: (state: PlayerState) => Partial<PlayerState>) => void,
  newValue: number,
  newDelta: number
) => {
  // Cancela o timer anterior, se existir
  if (timer) clearTimeout(timer);

  // Configura o novo timer para resetar o delta após 3 segundos
  timer = setTimeout(() => {
    set(() => ({ delta: 0 }));
    timer = null; // Limpa a referência
  }, TIME_TO_RESET_DELTA);

  // Retorna o novo estado
  return { lifeTotalValue: newValue, delta: newDelta };
};

export const usePlayerStore = create<PlayerState>((set) => ({
  lifeTotalValue: STARTING_VALUE,
  delta: 0,
  increment: (value = 0) =>
    set((state) =>
      updateWithTimer(set, state.lifeTotalValue + value, state.delta + value)
    ),
  reset: () => set({ lifeTotalValue: STARTING_VALUE, delta: 0 }),
  // set to specific lifeTotalValue and update delta by subtracting the new lifeTotalValue from the current lifeTotalValue
  setValue: (newValue: number) =>
    set((state) =>
      updateWithTimer(set, newValue, newValue - state.lifeTotalValue)
    ),
}));
