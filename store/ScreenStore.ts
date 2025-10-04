import { Direction } from "@/components/types";
import { create } from "zustand";

export enum Screen {
  main = "main",
  cdmg = "cdmg",
  game = "game",
}

interface ScreenState {
  screen: Screen;
  playerId: number;
  direction: Direction;
  setScreen: ({
    screen,
    playerId,
    direction,
  }: {
    screen: Screen;
    playerId?: number;
    direction?: Direction;
  }) => void;
}

const ScreenStore = create<ScreenState>((set, get) => ({
  screen: Screen.main,
  playerId: 1,
  direction: Direction.down,
  setScreen: ({ screen, playerId, direction }) =>
    set((state) => ({
      ...state,
      screen,
      playerId: playerId ?? state.playerId,
      direction: direction ?? state.direction,
    })),
}));

export default ScreenStore;
