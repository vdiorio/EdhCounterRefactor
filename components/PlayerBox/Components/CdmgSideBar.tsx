import Typography from "@/components/ui/Typography";
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import GameStore from "@/store/GameStore";
import StyleStore from "@/store/StyleStore";
import {
  selectPlayerCdmg,
  selectPlayerColors,
  selectPlayerColorWithAlpha,
} from "@/store/selectors";
import { getPlayerDirection } from "@/components/LayoutGenerator/Component/utils";
import usePlayerIcon from "@/hooks/usePlayerIcon";
import { PlayerViewProps } from "./UtilsSideBar.types";

export default function CdmgSideBar({ playerId, style, ...props }: PlayerViewProps) {
  const { t } = useTranslation();
  const setScreen = ScreenStore((state) => state.setScreen);
  const layout = GameStore((state) => state.gameLayout);

  const playerOpacityColor = StyleStore(selectPlayerColorWithAlpha(playerId, "C0"));

  const colors = StyleStore(selectPlayerColors);
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
        <Typography style={{ color: playerOpacityColor, fontSize: 10, marginBottom: 4, textAlign: "center" }}>{t('commander_damage')}</Typography>
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
            <View
              style={[
                styles.colorStrip,
                { backgroundColor: colors[opponentColorIndex] },
              ]}
            />
            <View style={styles.iconSlot}>
              {generatePlayerIcon(opponentId, 20)}
            </View>
            <Typography
              style={[styles.text, { color: colors[opponentColorIndex], flex: 3 }]}
              numberOfLines={1}
              adjustsFontSizeToFit
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
    position: "relative",
    alignItems: "center",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#555555",
  },
  cdmgConteiner: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    position: "relative",
    borderWidth: 0.5,
    borderColor: "#555555",
    gap: 8,
    flexDirection: "row",
    maxHeight: 40,
    backgroundColor: "#2D2D2D",
    paddingLeft: 8,
    paddingRight: 4,
  },
  colorStrip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  iconSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    verticalAlign: "middle",
    textAlign: "center",
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
