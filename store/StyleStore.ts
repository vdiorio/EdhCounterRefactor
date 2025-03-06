import { useColorScheme } from "react-native";
import { create } from "zustand";

interface StyleState {
  playerColors: string[];
  setPlayerColor: (id: number, color: string) => void;
}

const colorsDark = [
  "#003366", // Deep Blue
  "#005500", // Dark Green
  "#550000", // Muted Red
  "#FF0099", // Pink
  "#330055", // Purple
  "#553300", // Dark Orange
];

const colorsLight = [
  "#6699FF", // Light Blue
  "#66FF66", // Light Green
  "#FF6666", // Light Red
  "#FF66CC", // Light Pink
  "#9966FF", // Light Purple
  "#FFCC66", // Light Orange
];

const shuffleColors = (colorArray: string[]): string[] => {
  return colorArray.sort(() => Math.random() - 0.5);
};

export const StyleStore = create<StyleState>((set) => {
  const colorScheme = "dark";

  const colors = colorScheme === "dark" ? colorsLight : colorsDark;
  return {
    playerColors: shuffleColors(colors),
    setPlayerColor: (id, color) =>
      set((state) => ({ playerColors: [...state.playerColors, color] })),
  };
});

export default StyleStore;
