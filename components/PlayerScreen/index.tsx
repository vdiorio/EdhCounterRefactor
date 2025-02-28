import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  StatusBar,
  ViewProps,
} from "react-native";
import PlusIcon from "@/assets/icons/plus-sign";
import MinusIcon from "@/assets/icons/minus-sign";
import NumberInput from "@/components/ui/Input";
import Rotator from "../Rotator";
import { Direction } from "../types";
import GameStore from "@/store/GameStore";
import LifeTotal from "./Components/Lifetotal";
import DamageAllButton from "./Components/DamageAllButton";
import IncrementerButtons from "./Components/IncrementerButtons";

interface Props extends ViewProps {
  playerDirection?: Direction;
  playerId: number;
}

const PlayerScreen = ({
  playerDirection = Direction.down,
  playerId,
}: Props) => {
  return (
    <Rotator direction={playerDirection}>
      <View style={styles.content}>
        <LifeTotal playerId={playerId} />
      </View>
      <DamageAllButton playerId={playerId} />
      <IncrementerButtons
        playerId={playerId}
        playerDirection={playerDirection}
      />
    </Rotator>
  );
};

export default PlayerScreen;

/* ------- Compnentes ------- */

/* ------- Estilos ------- */

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
