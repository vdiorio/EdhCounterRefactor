import { useState } from "react";
import { SideBar } from "@/components/types";

/**
 * Custom hook to manage sidebar selection state for a player.
 * Prevents unnecessary re-renders of the parent component.
 */
export const useSidebarState = () => {
  const [selectedBar, setSelectedBar] = useState<SideBar | null>(null);

  const toggleBar = (bar: SideBar) => {
    setSelectedBar((prev) => (prev === bar ? null : bar));
  };

  return {
    selectedBar,
    setSelectedBar,
    toggleBar,
  };
};
