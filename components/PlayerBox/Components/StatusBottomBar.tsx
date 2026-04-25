import GameStore from "@/store/GameStore";
import CrownIcon from "@/assets/icons/crown";
import DungeonIcon from "@/assets/icons/dungeon";
import {
  selectInitiativePlayerId,
  selectMonarchPlayerId,
  selectPlayerColor,
  selectShowInitiativeBar,
  selectShowMonarchBar,
} from "@/store/selectors";
import StyleStore from "@/store/StyleStore";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutDown, FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import { PlayerViewProps } from "./UtilsSideBar.types";

const MONARCH_COLOR = "#d4af37";
const INITIATIVE_COLOR = "#7e57c2";

export default function StatusBottomBar({ playerId, style, ...props }: PlayerViewProps) {
  const showMonarchBar = GameStore(selectShowMonarchBar);
  const showInitiativeBar = GameStore(selectShowInitiativeBar);
  const monarchPlayerId = GameStore(selectMonarchPlayerId);
  const initiativePlayerId = GameStore(selectInitiativePlayerId);
  const playerColor = StyleStore(selectPlayerColor(playerId));

  const claimMonarch = GameStore((state) => state.claimMonarch);
  const claimInitiative = GameStore((state) => state.claimInitiative);

  const isMonarchHighlighted = monarchPlayerId === playerId;
  const isInitiativeHighlighted = initiativePlayerId === playerId;

  return (
    <Animated.View
      entering={FadeInDown.duration(220)}
      exiting={FadeOutDown.duration(220)}
      layout={LinearTransition.duration(200)}
      style={[
        styles.container,
        {
          borderColor: playerColor,
        },
        style,
      ]}
      pointerEvents="box-none"
      {...props}
    >
      {showMonarchBar && (
        <Animated.View layout={LinearTransition.duration(200)} entering={FadeIn.duration(180)} exiting={FadeOut.duration(180)}>
          <TouchableOpacity
            testID={`monarch-${playerId}`}
            disabled={isMonarchHighlighted}
            activeOpacity={isMonarchHighlighted ? 1 : 0.7}
            onPress={() => claimMonarch(playerId)}
            style={[
              styles.iconButton,
              {
                borderColor: isMonarchHighlighted ? MONARCH_COLOR : "#55555580",
                backgroundColor: isMonarchHighlighted ? MONARCH_COLOR + "30" : "transparent",
              },
            ]}
          >
            <CrownIcon
              size={18}
              color={isMonarchHighlighted ? MONARCH_COLOR : "#888888"}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {showInitiativeBar && (
        <Animated.View layout={LinearTransition.duration(200)} entering={FadeIn.duration(180)} exiting={FadeOut.duration(180)}>
          <TouchableOpacity
            testID={`initiative-${playerId}`}
            disabled={isInitiativeHighlighted}
            activeOpacity={isInitiativeHighlighted ? 1 : 0.7}
            onPress={() => claimInitiative(playerId)}
            style={[
              styles.iconButton,
              {
                borderColor: isInitiativeHighlighted ? INITIATIVE_COLOR : "#55555580",
                backgroundColor: isInitiativeHighlighted ? INITIATIVE_COLOR + "30" : "transparent",
              },
            ]}
          >
            <DungeonIcon
              size={18}
              color={isInitiativeHighlighted ? INITIATIVE_COLOR : "#888888"}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
}

export function StatusBottomBarSlot({ playerId }: { playerId: number }) {
  const showMonarchBar = GameStore(selectShowMonarchBar);
  const showInitiativeBar = GameStore(selectShowInitiativeBar);
  if (!showMonarchBar && !showInitiativeBar) return null;
  return <StatusBottomBar playerId={playerId} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: -2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#0d0d0d",
    zIndex: 20,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
