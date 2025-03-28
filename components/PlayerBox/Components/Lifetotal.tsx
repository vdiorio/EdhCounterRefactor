import MinusIcon from "@/assets/icons/minus-sign";
import PlusIcon from "@/assets/icons/plus-sign";
import Typography from "@/components/ui/Typography";
import GameStore from "@/store/GameStore";
import { StyleStore } from "@/store/StyleStore";
import { useState, useMemo } from "react";
import { ViewProps } from "react-native";
import { Button, StyleSheet, View } from "react-native";

interface Props extends ViewProps {
  playerId: number;
  noIcon?: boolean;
}

const LIFE_FONT_SIZE = 48;
const DELTA_FONT_SIZE = Math.floor(LIFE_FONT_SIZE * 0.3333);
const VISUAL_HELPER_ICON_SIZE = Math.round(LIFE_FONT_SIZE / 4);

const LifeTotal = ({ playerId, style, noIcon = false, ...props }: Props) => {
  const [editing, setEditing] = useState(false);
  const lTotal = GameStore((state) => state.players[playerId].lTotal);
  const delta = GameStore((state) => state.players[playerId].delta);

  const playerColor = StyleStore((state) => state.playerColors)[playerId - 1];

  const deltaColor = useMemo(() => (delta > 0 ? "lime" : "red"), [delta]);
  const opacity = useMemo(() => (lTotal <= 0 ? 0.5 : 1), [lTotal]);

  const toggleEditing = () => setEditing(!editing);

  const removePlayerFromLayout = GameStore(
    (state) => state.removePlayerFromLayout
  );

  return (
    <>
      <View
        data-testid={`lifetotal-${playerId}`}
        style={[styles.container, style]}
        {...props}
      >
        <Typography
          testID="delta"
          style={[styles.deltaText, { color: deltaColor }]}
        >
          {delta > 0 ? `+${delta}` : delta || " "}
        </Typography>
        {!noIcon && (
          <MinusIcon
            size={VISUAL_HELPER_ICON_SIZE}
            color={playerColor}
            opacity={opacity}
          />
        )}
        <Typography
          scheme={{ dark: playerColor, light: "#121212" }}
          onLongPress={toggleEditing}
          style={{ ...styles.lifeTotal, opacity }}
          testID={`lifetotal-${playerId}`}
        >
          {lTotal}
        </Typography>
        {!noIcon && (
          <PlusIcon
            size={VISUAL_HELPER_ICON_SIZE}
            color={playerColor}
            opacity={opacity}
          />
        )}
      </View>

      {lTotal <= 0 && (
        <View style={{ zIndex: 10 }}>
          <Button
            title="Delete Player"
            onPress={() => removePlayerFromLayout(playerId)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  lifeTotal: {
    fontSize: LIFE_FONT_SIZE,
    fontWeight: "bold",
    margin: 10,
  },
  deltaText: {
    fontSize: DELTA_FONT_SIZE,
    marginBottom: 10,
    position: "absolute",
    top: -0,
    right: 0,
    left: 0,
    textAlign: "center",
    fontWeight: "900",
  },
});

export default LifeTotal;
