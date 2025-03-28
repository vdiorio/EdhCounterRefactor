import MinusIcon from "@/assets/icons/minus-sign";
import PlusIcon from "@/assets/icons/plus-sign";
import GameStore from "@/store/GameStore";
import ScreenStore from "@/store/ScreenStore";
import StyleStore from "@/store/StyleStore";
import { useState } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ViewProps,
  Dimensions,
} from "react-native";

interface Props extends ViewProps {
  playerId: number;
  positionId: number;
  partner?: boolean;
}

export default function CdmgIncrementer({
  playerId,
  positionId,
  partner = false,
  ...props
}: Props) {
  const { Cdmg } = GameStore((state) => state.players[playerId]);
  const ATTACKER_COLOR = StyleStore((state) => state.playerColors)[
    positionId - 1
  ];

  const dealCdmg = GameStore((state) => state.dealCommanderDamage);

  const defenderId = playerId;
  const attackerId = positionId;

  const cDmgIndex = partner ? 1 : 0;

  function incrementCdmg(value: number) {
    dealCdmg({ playerId, attackerId, value, partner });
  }

  return (
    <View style={[styles.content, { borderColor: ATTACKER_COLOR }]} {...props}>
      <TouchableHighlight
        onPress={() => incrementCdmg(-1)}
        style={[styles.iconButton, { left: 0 }]}
        underlayColor={"rgba(255,0,0,0.1)"}
        activeOpacity={0.4}
      >
        <MinusIcon color={ATTACKER_COLOR} strokeWidth="2" size={8} />
      </TouchableHighlight>

      <Text style={[styles.text, { color: ATTACKER_COLOR }]}>
        {Cdmg[attackerId][cDmgIndex]}
      </Text>

      <TouchableHighlight
        onPress={() => incrementCdmg(1)}
        style={[styles.iconButton, { right: 0, alignItems: "flex-end" }]}
        underlayColor={"rgba(0,255,0,0.1)"}
        activeOpacity={0.4}
      >
        <PlusIcon color={ATTACKER_COLOR} strokeWidth="2" size={8} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    width: "46%",
  },
  text: {
    fontSize: 25,
    width: 40,
    textAlign: "center",
  },
  iconButton: {
    position: "absolute",
    width: "60%",
    height: "100%",
    zIndex: 4,
    display: "flex",
    paddingHorizontal: 5,
    justifyContent: "center",
  },
});
