import { DimensionValue } from "react-native";

export enum Direction {
  right = "90deg",
  left = "-90deg",
  up = "180deg",
  down = "0deg",
}
interface RotatedStyle {
  transform: [{ rotate: string }];
  width: DimensionValue;
  height: DimensionValue;
}
