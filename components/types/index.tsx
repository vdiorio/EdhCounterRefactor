import { DimensionValue } from "react-native";

export enum Direction {
  right = "-90deg",
  left = "90deg",
  up = "180deg",
  down = "0deg",
}
export interface RotatedStyle {
  transform: [{ rotate: string }];
  width: DimensionValue;
  height: DimensionValue;
}

export enum SideBar {
  cdmg = "cdmg",
  history = "history",
}
