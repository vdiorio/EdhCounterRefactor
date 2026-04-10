import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS } from "@/constants/ui";
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
  currentPlayerId: number;
  direction?: Direction;
}

export default function CdmgBox({ positionId, currentPlayerId, style, ...props }: Props) {
  const direction = ScreenStore((state) => state.direction);
  const setScreen = ScreenStore((state) => state.setScreen);
  const togglePlayerChain = GameStore((state) => state.togglePlayerChain);
  const player = GameStore((state) => state.players[positionId]);
  const playerColor = StyleStore((state) => state.playerColors[positionId - 1]);
  const chainColor = player.chain ? "#70e700ff" : "#888888";
  const [isPartner, setIsPartner] = useState(false);


  return (
    <View style={[styles.box, { borderColor: playerColor }, style]}>
      {positionId !== currentPlayerId ? (
        <Rotator style={[{ flex: 1 }]} direction={direction}>
          <View style={[styles.container]}>
            <View style={[styles.incrementerContainer]}>
              <CdmgIncrementer playerId={currentPlayerId} positionId={positionId} />
              {isPartner && (
                <CdmgIncrementer
                  playerId={currentPlayerId}
                  positionId={positionId}
                  partner
                />
              )}
            </View>
            <View style={styles.parnerContainer}>
              <Text style={{ color: "white" }}>Partner</Text>
              <Switch
                value={isPartner}
                onValueChange={setIsPartner}
                trackColor={{ false: "#888888", true: playerColor }}
                thumbColor={"#fff"}
                
              />
            </View>
          </View>
        </Rotator>
      ) : (
        <Rotator style={[{ flex: 1 }]} direction={direction}>
          <View style={[styles.container]}>
            <TouchableHighlight
              onPress={() => setScreen({ screen: Screen.game })}
              style={[styles.backButton, { borderColor: 'lightgrey' }]}
              underlayColor={'lightgrey' + "33"}
            >
              <Text style={[styles.buttonText, { color: 'lightgrey' }]}>
                <FontAwesome name="arrow-left" size={16} color={'lightgrey'} />{" "}
                Voltar
              </Text>
            </TouchableHighlight>
            <View style={styles.chainLinkContainer}>
              <TouchableOpacity
                onPress={() => togglePlayerChain(currentPlayerId)}
                style={[
                  styles.lifeTotal,
                  {
                    borderWidth: 3,
                    borderColor: chainColor,
                    borderRadius: 8,
                  },
                ]}
              >
                <FontAwesome
                  name={player.chain ? "link" : "chain-broken"}
                  size={24}
                  color={chainColor}
                  style={styles.chainIcon}
                />
                <LifeTotal
                  playerId={currentPlayerId}
                  noIcon
                  style={{width: "auto"}}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Rotator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    flex: 1,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 10,
    margin: 2
  },
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
    fontSize: 14,
  },
  checkbox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: "auto",
    height: "auto",
  },
  chainLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },
  lifeTotal: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
  },
  chainIcon: {
    paddingLeft: 5,
    transform: [{ translateY: 3 }],
  },
});
