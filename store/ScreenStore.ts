import { Direction } from "@/components/types";
import { create } from "zustand";

interface ScreenState {
  screen: string;
  playerId: number;
  direction: Direction;
  setScreen: ({
    screen,
    playerId,
    direction,
  }: {
    screen?: string;
    playerId?: number;
    direction?: Direction;
  }) => void;
}

const ScreenStore = create<ScreenState>((set, get) => ({
  screen: "",
  playerId: 1,
  direction: Direction.down,
  setScreen: ({ screen, playerId, direction }) =>
    set({ screen, playerId, direction }),
}));

export default ScreenStore;
