import { ViewProps } from "react-native";
import { SideBar } from "@/components/types";

export interface UtilsSideBarProps extends ViewProps {
  playerId: number;
  toggleBar: (bar: SideBar) => void;
  selectedBar: SideBar | null;
}
