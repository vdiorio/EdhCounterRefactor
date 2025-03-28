import GameStore from "@/store/GameStore";
import DamageAllButton from "./DamageAllButton";
import { StyleSheet, ViewProps, View } from "react-native";
import Typography from "@/components/ui/Typography";

interface Props extends ViewProps {
  playerId: number;
}

export default function UtilsSideBar({ playerId, style, ...props }: Props) {
  return (
    <View style={[styles.sideBar, style]} {...props}>
      <DamageAllButton playerId={playerId} />
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    flexDirection: "column-reverse",
  },
});
