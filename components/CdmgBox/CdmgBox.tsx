import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
} from "react-native";
import CdmgIncrementer from "./Components/CdmgIncrementer";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Rotator from "../Rotator/Rotator";
import { Direction } from "../types";
import ScreenStore, { Screen } from "@/store/ScreenStore";
import LifeTotal from "../PlayerBox/Components/Lifetotal";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GameStore from "@/store/GameStore";
import StyleStore from "@/store/StyleStore";

interface Props extends ViewProps {
  positionId: number;
  direction?: Direction;
}

export default function CdmgBox({ positionId, style, ...props }: Props) {
  const playerId = ScreenStore((state) => state.playerId);
  const direction = ScreenStore((state) => state.direction);
  const setScreen = ScreenStore((state) => state.setScreen);
  const togglePlayerChain = GameStore((state) => state.togglePlayerChain);
  const player = GameStore((state) => state.players[positionId]);
  const playerColor = StyleStore((state) => state.playerColors[positionId - 1]);
  const chainColor = player.chain ? "#70e700ff" : "#888888";
  const [isPartner, setIsPartner] = useState(false);

  const [isSm, setIsSm] = useState(false);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setIsSm(width < 200);
  };

  return (
    <View style={[{ flex: 1, borderColor: "#555555" }, style]}>
      {positionId !== playerId ? (
        <Rotator style={[{ flex: 1 }]} direction={direction}>
          <View style={[styles.container]}>
            <View onLayout={onLayout} style={[styles.incrementerContainer]}>
              <CdmgIncrementer playerId={playerId} positionId={positionId} />
              {isPartner && (
                <CdmgIncrementer
                  playerId={playerId}
                  positionId={positionId}
                  partner
                />
              )}
            </View>
            <View style={styles.parnerContainer}>
              <Text style={{ color: "white" }}>Partner</Text>
              <Switch value={isPartner} onValueChange={setIsPartner} />
            </View>
          </View>
        </Rotator>
      ) : (
        <Rotator style={[{ flex: 1 }]} direction={direction}>
          <View style={[styles.container]}>
            <TouchableHighlight
              onPress={() => setScreen({ screen: Screen.game })}
              style={[styles.backButton, { borderColor: playerColor }]}
              underlayColor={playerColor + "33"}
            >
              <Text style={[styles.buttonText, { color: playerColor }]}>
                <FontAwesome name="arrow-left" size={12} color={playerColor} />{" "}
                Voltar
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.checkbox,
                {
                  borderColor: player.chain ? chainColor : "transparent",
                  borderWidth: 1,
                },
              ]}
              onPress={() => togglePlayerChain(playerId)}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: chainColor,
                    textDecorationLine: player.chain ? "none" : "line-through",
                  },
                ]}
              >
                <FontAwesome
                  name={player.chain ? "link" : "chain-broken"}
                  size={12}
                  color={chainColor}
                />{" "}
                Linkar a vida
              </Text>
            </TouchableHighlight>
            <LifeTotal
              style={{ transform: [{ translateY: 10 }] }}
              playerId={playerId}
              noIcon
            />
          </View>
        </Rotator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  incrementerContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  parnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 10,
    position: "absolute",
    top: 5,
    right: 5,
  },
  buttonText: {
    fontSize: 10,
  },
  checkbox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    bottom: 5,
    left: 5,
    width: "auto",
    height: "auto",
    transform: [{ translateY: 10 }],
  },
});
