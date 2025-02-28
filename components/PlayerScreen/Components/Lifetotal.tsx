import MinusIcon from "@/assets/icons/minus-sign";
import PlusIcon from "@/assets/icons/plus-sign";
import NumberInput from "@/components/ui/Input";
import GameStore from "@/store/GameStore";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  playerId: number;
}

const ICON_COLOR = "rgba(0, 0, 0, 0.5)";
const LIFE_FONT_SIZE = 48;
const DELTA_FONT_SIZE = Math.floor(LIFE_FONT_SIZE * 0.3333);
const VISUAL_HELPER_ICON_SIZE = Math.round(LIFE_FONT_SIZE / 4);

const LifeTotal = ({ playerId }: Props) => {
  const [editing, setEditing] = useState(false);
  const lTotal = GameStore((state) => state.players[playerId].lTotal);
  const delta = GameStore((state) => state.players[playerId].delta);

  const deltaColor = delta > 0 ? "green" : "red";
  const toggleEditing = () => setEditing(!editing);

  // const handleInputConfirm = (newLife: string | number = lTotal) => {
  //   setLife({ playerId, newLife: Number(newLife) });
  //   setEditing(false);
  // };
  // if (editing) {
  //   return (
  //     <NumberInput
  //       initialValue={lTotal}
  //       onConfirm={handleInputConfirm}
  //       onCancel={toggleEditing}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={[styles.deltaText, { color: deltaColor }]}>
        {delta > 0 ? `+${delta}` : delta || " "}
      </Text>
      <MinusIcon size={VISUAL_HELPER_ICON_SIZE} color={ICON_COLOR} />
      <Text onLongPress={toggleEditing} style={styles.lifeTotal}>
        {lTotal}
      </Text>
      <PlusIcon size={VISUAL_HELPER_ICON_SIZE} color={ICON_COLOR} />
    </View>
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
    zIndex: 20,
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
