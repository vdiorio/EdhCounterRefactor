import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
  Button,
} from "react-native";
import AnimatedAdjustableView from "../ui/Animations/AutoAdjustableView";
import CdmgIncrementer from "./Components/CdmgIncrementer";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Rotator from "../Rotator/Rotator";
import { Direction } from "../types";
import ScreenStore from "@/store/ScreenStore";
import PlayerBox from "../PlayerBox/PlayerBox";
import LifeTotal from "../PlayerBox/Components/Lifetotal";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GameStore from "@/store/GameStore";

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

  const [isPartner, setIsPartner] = useState(false);
  const [playerChain, setPlayerChain] = useState<boolean[]>(
    Array.from({ length: 6 }, () => false)
  );

  console.log({ playerChain });

  return (
    <AnimatedAdjustableView
      style={[{ flex: 1, borderColor: "#555555" }, style]}
    >
      {positionId !== playerId ? (
        <Rotator style={[{ flex: 1 }]} direction={direction}>
          <View style={[styles.container]}>
            <View style={styles.incrementerContainer}>
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
              style={{
                backgroundColor: player.chain ? "green" : "red",
                padding: 5,
                borderRadius: 2,
                position: "absolute",
                top: 5,
                left: 5,
              }}
              onPress={() => togglePlayerChain(playerId)}
            >
              <FontAwesome name="chain" size={24} color="white" />
            </TouchableHighlight>
            <LifeTotal playerId={playerId} noIcon />
          </View>
          <Button onPress={() => setScreen({ screen: "game" })} title="Back" />
        </Rotator>
      )}
    </AnimatedAdjustableView>
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
    width: "90%",
    flexDirection: "row",
    gap: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  parnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
