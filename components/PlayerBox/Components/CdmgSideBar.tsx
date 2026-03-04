import Typography from "@/components/ui/Typography";
import DamageAllButton from "./DamageAllButton";
import { StyleSheet, ViewProps, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import GameStore from "@/store/GameStore";
import { Direction } from "@/components/types";
import StyleStore from "@/store/StyleStore";
import { selectPlayerCdmg } from "@/store/selectors";
import { getPlayerDirection } from "@/components/LayoutGenerator/Component/utils";
import usePlayerIcon from "@/hooks/usePlayerIcon";

interface Props extends ViewProps {
  playerId: number;
}


export default function CdmgSideBar({ playerId, style, ...props }: Props) {
  const setScreen = ScreenStore((state) => state.setScreen);
  const layout = GameStore((state) => state.gameLayout);

  const playerOpacityColor = StyleStore((state) => state.playerColors[playerId - 1] + 'C0');

  const colors: string[] = StyleStore((state) => state.playerColors);
  const generatePlayerIcon = usePlayerIcon(playerId);

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
      {/* shield icon behind everything */}
      <View style={styles.backgroundIcon}>
        <Typography style={{ color: playerOpacityColor, fontSize: 10, marginBottom: 4, textAlign: "center" }}>Dano de comandante</Typography>
        <Ionicons name="shield" size={40} color={playerOpacityColor} />
      </View>

      {Object.keys(cdmg).map((key) => {
        const opponentId = parseInt(key);
        const [p1, p2] = cdmg[key as unknown as keyof typeof cdmg];
        const opponentColorIndex = opponentId - 1;
        if (p1 === 0 && p2 === 0) {
          return null;
        }
        return (
          <View
            key={key}
            style={styles.cdmgConteiner}
          >
            <View>
              {generatePlayerIcon(opponentId, 20)}
            </View>
            <Typography
              style={[styles.text, { color: colors[opponentColorIndex] }]}
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
    position:'relative',
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
    borderWidth: 0.5,
    borderColor: "#555555",
    gap: 8,
    flexDirection: "row",
    maxHeight: 40,
    backgroundColor: "#2D2D2D",
  },
  text: {
    fontSize: 12,
    verticalAlign: "middle",
  },
  backgroundIcon: {
    position: "absolute",
    zIndex: -1,
    alignSelf: "center",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
