import { ViewProps } from "react-native";
import { SideBar } from "@/components/types";

export interface PlayerViewProps extends ViewProps {
  playerId: number;
}

export interface UtilsSideBarProps extends PlayerViewProps {
  toggleBar: (bar: SideBar) => void;
  selectedBar: SideBar | null;
}
