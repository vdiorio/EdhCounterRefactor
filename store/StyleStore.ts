import { create } from "zustand";

interface StyleState {
  playerColors: string[];
  setPlayerColor: (id: number, color: string) => void;
}

const colorsDark = [                                                                             
  "#6699FF", // Light Blue                                                                        
  "#00c300", // Dark Green                                                                        
  "#FF6666", // Light Red                                                                         
  "#FF66CC", // Light Pink                                                                        
  "#9966FF", // Light Purple                                                                      
  "#bec400", // Light Orange                                                                      
];

const shuffleColors = (colorArray: string[]): string[] => {
  return colorArray.sort(() => Math.random() - 0.5);
};

export const StyleStore = create<StyleState>((set) => ({
  playerColors: shuffleColors([...colorsDark]),
  setPlayerColor: (id, color) =>
    set((state) => {
      const next = [...state.playerColors];
      next[id - 1] = color;
      return { playerColors: next };
    }),
}));

export default StyleStore;
