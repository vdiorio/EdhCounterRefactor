import PlayerScreen from "@/components/PlayerScreen";
import { Direction } from "@/components/types";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface renderPlayerProps extends ViewProps {
  playerId: number;
  playerDirection: Direction;
}

const renderPlayer = ({
  playerId,
  playerDirection,
  style,
}: renderPlayerProps) => (
  <View style={[{ height: "100%", width: "100%" }, style]}>
    <PlayerScreen playerId={playerId} playerDirection={playerDirection} />
  </View>
);

export default renderPlayer;
