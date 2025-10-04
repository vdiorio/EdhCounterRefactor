import Typography from "@/components/ui/Typography";
import DamageAllButton from "./DamageAllButton";
import { StyleSheet, ViewProps, View, TouchableOpacity } from "react-native";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import GameStore from "@/store/GameStore";
import { Direction } from "@/components/types";
import StyleStore from "@/store/StyleStore";

interface Props extends ViewProps {
  playerId: number;
}

const findDirection = (layout: number[], playerId: number) => {
  let playerIndex = -1;
  layout.reduce((acc, curr, i) => {
    if (playerId <= acc + curr && playerIndex === -1) playerIndex = i;
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

  const colors: string[] = StyleStore((state) => state.playerColors).filter(
    (_, index) => index !== playerId - 1
  );

  const cdmg = GameStore((state) => state.players[playerId].Cdmg);

  return (
    <TouchableOpacity
      style={[styles.sideBar, style]}
      {...props}
      onPress={() => {
        setScreen({
          screen: Screen.cdmg,
          playerId,
          direction: findDirection(layout, playerId),
        });
      }}
    >
      {Object.keys(cdmg).map((key, i) => {
        const [p1, p2] = cdmg[key as unknown as keyof typeof cdmg];
        return (
          <View
            key={key}
            style={[
              styles.cdmgConteiner,
              { backgroundColor: colors[i] + "1a" },
            ]}
          >
            <Typography
              style={[styles.text, { color: colors[i] }]}
              numberOfLines={1}
            >
              {p1}
              {p2 !== 0 && ` - ${p2}`}
            </Typography>
          </View>
        );
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    alignItems: "center",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#555555",
  },
  button: {
    backgroundColor: "#ff4d4d",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cdmgConteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 18,
    verticalAlign: "middle",
  },
});
