import { useColorScheme } from "react-native";
import { AppColors } from "@/constants/theme";

export default function useAppColors() {
  const scheme = useColorScheme() || "dark";
  return scheme === "dark" ? AppColors.dark : AppColors.light;
}
