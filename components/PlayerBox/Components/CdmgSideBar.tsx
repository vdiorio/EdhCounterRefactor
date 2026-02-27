import Typography from "@/components/ui/Typography";
import DamageAllButton from "./DamageAllButton";
import { StyleSheet, ViewProps, View, TouchableOpacity } from "react-native";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import GameStore from "@/store/GameStore";
import { Direction } from "@/components/types";
import StyleStore from "@/store/StyleStore";
import { selectPlayerCdmg } from "@/store/selectors";
import { selectPlayerColor } from "@/store/selectors";
import { getPlayerDirection } from "@/components/LayoutGenerator/Component/utils";

interface Props extends ViewProps {
  playerId: number;
}


export default function CdmgSideBar({ playerId, style, ...props }: Props) {
  const setScreen = ScreenStore((state) => state.setScreen);
  const layout = GameStore((state) => state.gameLayout);

  const allColors: string[] = StyleStore((state) => state.playerColors);
  const colors: string[] = allColors.filter((_, index) => index !== playerId - 1);

  const cdmg = GameStore(selectPlayerCdmg(playerId));

  return (
    <TouchableOpacity
      style={[styles.sideBar, style]}
      {...props}
      onPress={() => {
        setScreen({
          screen: Screen.cdmg,
          playerId,
          direction: getPlayerDirection(layout, playerId),
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
