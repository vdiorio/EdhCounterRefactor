import Typography from "@/components/ui/Typography";
import DamageAllButton from "./DamageAllButton";
import { StyleSheet, ViewProps, View, TouchableOpacity } from "react-native";
import ScreenStore from "@/store/ScreenStore";
import GameStore from "@/store/GameStore";
import { Direction } from "@/components/types";

interface Props extends ViewProps {
  playerId: number;
}

const findDirection = (layout: number[], playerId: number) => {
  let playerIndex = -1;
  layout.reduce((acc, curr, i) => {
    if (playerId <= acc + curr && playerIndex === -1) playerIndex = i;
    if (playerId === 2) console.log({ acc, curr, playerIndex });
    return acc + curr;
  }, 0);
  switch (playerIndex) {
    case 0:
      return Direction.up;
    case 1:
      return Direction.left;
    case 2:
      return Direction.right;
    default:
      return Direction.down;
  }
};

export default function CdmgSideBar({ playerId, style, ...props }: Props) {
  const setScreen = ScreenStore((state) => state.setScreen);
  const layout = GameStore((state) => state.gameLayout);

  const cdmg = GameStore((state) => state.players[playerId].Cdmg);

  return (
    <View style={[styles.sideBar, style]} {...props}>
      <TouchableOpacity
        onPress={() => {
          console.log({
            playerId,
            direction: findDirection(layout, playerId),
          });
          setScreen({
            screen: "cdmg",
            playerId,
            direction: findDirection(layout, playerId),
          });
        }}
        style={styles.button}
      >
        <Typography style={{ fontSize: 10 }}>Cdmg</Typography>
      </TouchableOpacity>

      {Object.keys(cdmg).map((key) => {
        const [p1, p2] = cdmg[key as unknown as keyof typeof cdmg];
        return (
          <View key={key}>
            <Typography>
              {Math.max(p1, p2)} - {Math.min(p1, p2)}
            </Typography>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {},
  button: {
    backgroundColor: "#ff4d4d",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
