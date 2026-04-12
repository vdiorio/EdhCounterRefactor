import { memo, useCallback, useRef, useState } from "react";
import Typography from "@/components/ui/Typography";
import PoisonCounterIcon from "@/assets/icons/poison-counter";
import GameStore from "@/store/GameStore";
import {
  selectPlayerEnergy,
  selectPlayerExperience,
  selectPlayerPoison,
  selectShowInitiativeBar,
  selectShowMonarchBar,
} from "@/store/selectors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { PlayerViewProps } from "./UtilsSideBar.types";

const POISON_COLOR = "#2e7d32";
const ENERGY_COLOR = "#fbc02d";
const XP_COLOR = "#1e88e5";

interface CounterRowProps {
  testIdPrefix: string;
  icon: React.ReactNode;
  color: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CounterRow = memo(function CounterRow({
  testIdPrefix,
  icon,
  color,
  value,
  onIncrement,
  onDecrement,
}: CounterRowProps) {
  return (
    <View style={styles.row} testID={`${testIdPrefix}-row`}>
      <View style={[styles.colorStrip, { backgroundColor: color }]} />

      <View style={styles.valueContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Typography style={[styles.value, { color }]} testID={`${testIdPrefix}-value`}>
          {value}
        </Typography>
      </View>

      <View style={styles.touchLayer}>
        <TouchableHighlight
          style={styles.touchable}
          onPress={onDecrement}
          underlayColor={"rgba(255,0,0,0.1)"}
          activeOpacity={0.4}
          testID={`${testIdPrefix}-decrement`}
        >
          <View />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.touchable}
          onPress={onIncrement}
          underlayColor={"rgba(0,255,0,0.1)"}
          activeOpacity={0.4}
          testID={`${testIdPrefix}-increment`}
        >
          <View />
        </TouchableHighlight>
      </View>
    </View>
  );
});

export default function CountersSideBar({ playerId, style, ...props }: PlayerViewProps) {
  const poison = GameStore(selectPlayerPoison(playerId));
  const energy = GameStore(selectPlayerEnergy(playerId));
  const experience = GameStore(selectPlayerExperience(playerId));

  const incrementPoison = GameStore((state) => state.incrementPoison);
  const incrementEnergy = GameStore((state) => state.incrementEnergy);
  const incrementExperience = GameStore((state) => state.incrementExperience);
  const proliferate = GameStore((state) => state.proliferate);
  const undoProliferate = GameStore((state) => state.undoProliferate);
  const showMonarchBar = GameStore(selectShowMonarchBar);
  const showInitiativeBar = GameStore(selectShowInitiativeBar);
  const toggleMonarchBar = GameStore((state) => state.toggleMonarchBar);
  const toggleInitiativeBar = GameStore((state) => state.toggleInitiativeBar);

  const proliferateCountRef = useRef(0);
  const [proliferateCount, setProliferateCount] = useState(0);
  const undoTimer = useRef<NodeJS.Timeout | null>(null);

  const handleProliferate = useCallback(() => {
    proliferate(playerId);
    proliferateCountRef.current += 1;
    setProliferateCount(proliferateCountRef.current);
  }, [proliferate, playerId]);

  const doUndo = useCallback(() => {
    if (proliferateCountRef.current === 0) return;
    undoProliferate(playerId);
    proliferateCountRef.current -= 1;
    setProliferateCount(proliferateCountRef.current);
  }, [undoProliferate, playerId]);

  const handleUndoLongPress = useCallback(() => {
    doUndo();
    undoTimer.current = setInterval(doUndo, 400);
  }, [doUndo]);

  const handlePressOut = useCallback(() => {
    if (undoTimer.current) {
      clearInterval(undoTimer.current);
      undoTimer.current = null;
    }
  }, []);
  const onPoisonIncrement = useCallback(() => incrementPoison({ playerId, value: 1 }), [incrementPoison, playerId]);
  const onPoisonDecrement = useCallback(
    () => incrementPoison({ playerId, value: poison > 9 ? 9 - poison : -1 }),
    [incrementPoison, playerId, poison]
  );
  const onEnergyIncrement = useCallback(() => incrementEnergy({ playerId, value: 1 }), [incrementEnergy, playerId]);
  const onEnergyDecrement = useCallback(() => incrementEnergy({ playerId, value: -1 }), [incrementEnergy, playerId]);
  const onExperienceIncrement = useCallback(() => incrementExperience({ playerId, value: 1 }), [incrementExperience, playerId]);
  const onExperienceDecrement = useCallback(() => incrementExperience({ playerId, value: -1 }), [incrementExperience, playerId]);
  const handleMonarchToggle = useCallback(() => toggleMonarchBar(playerId), [toggleMonarchBar, playerId]);
  const handleInitiativeToggle = useCallback(() => toggleInitiativeBar(playerId), [toggleInitiativeBar, playerId]);

  return (
    <View style={[styles.sideBar, style]} {...props}>

      <CounterRow
        testIdPrefix={`counter-poison-${playerId}`}
        icon={POISON_ICON}
        color={POISON_COLOR}
        value={Math.min(poison, 10)}
        onIncrement={onPoisonIncrement}
        onDecrement={onPoisonDecrement}
      />
      <CounterRow
        testIdPrefix={`counter-energy-${playerId}`}
        icon={ENERGY_ICON}
        color={ENERGY_COLOR}
        value={energy}
        onIncrement={onEnergyIncrement}
        onDecrement={onEnergyDecrement}
      />
      <CounterRow
        testIdPrefix={`counter-xp-${playerId}`}
        icon={XP_ICON}
        color={XP_COLOR}
        value={experience}
        onIncrement={onExperienceIncrement}
        onDecrement={onExperienceDecrement}
      />

      <TouchableOpacity
        testID={`proliferate-${playerId}`}
        style={styles.proliferateButton}
        onPress={handleProliferate}
        onLongPress={handleUndoLongPress}
        onPressOut={handlePressOut}
        delayLongPress={400}
      >
        <Typography style={styles.proliferateText}>Proliferate</Typography>
        {proliferateCount > 0 && <Typography style={styles.proliferateCount}>+{proliferateCount}</Typography>}
      </TouchableOpacity>

      <View style={styles.objectiveControls}>
        <TouchableOpacity
          testID={`toggle-monarch-${playerId}`}
          style={[
            styles.objectiveButton,
            showMonarchBar && { borderColor: "#d4af37", backgroundColor: "#d4af3728" },
          ]}
          onPress={handleMonarchToggle}
        >
          <FontAwesome5
            name={"crown" as any}
            size={14}
            color={showMonarchBar ? "#d4af37" : "#BBBBBB"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`toggle-initiative-${playerId}`}
          style={[
            styles.objectiveButton,
            showInitiativeBar && { borderColor: "#7e57c2", backgroundColor: "#7e57c228" },
          ]}
          onPress={handleInitiativeToggle}
        >
          <FontAwesome5
            name={"dungeon" as any}
            size={14}
            color={showInitiativeBar ? "#7e57c2" : "#BBBBBB"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    position: "relative",
    height: "100%",
    alignItems: "center",
  },
  colorStrip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  valueContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingLeft: 8,
    paddingRight: 4,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 10,
  },
  value: {
    flex: 3,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  xpIcon: {
    fontSize: 14,
    fontWeight: "700",
  },
  touchLayer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  row: {
    flex: 1,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#555555",
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 4,
  },
  proliferateButton: {
    flex: 1,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#555555",
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 4,
    flexDirection: "row",
    gap: 6,
  },
  proliferateText: {
    color: "#26c6da",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  proliferateCount: {
    color: "#26c6da",
    fontSize: 14,
    fontWeight: "700",
  },
  objectiveControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  objectiveButton: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18,18,18,0.7)",
  },
});

// Stable icon elements — all props are module-level constants, created once
const POISON_ICON = <PoisonCounterIcon size={18} color={POISON_COLOR} opacity={0.95} />;
const ENERGY_ICON = <Ionicons name="flash" size={18} color={ENERGY_COLOR} />;
const XP_ICON = <Typography style={[styles.xpIcon, { color: XP_COLOR }]}>XP</Typography>;
