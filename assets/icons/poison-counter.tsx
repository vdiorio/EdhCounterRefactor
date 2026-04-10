import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface PoisonCounterIconProps {
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}

const PoisonCounterIcon = ({
  size = 20,
  color = "#FFFFFF",
  opacity = 1,
  strokeWidth = 3,
}: PoisonCounterIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <Circle cx="12" cy="12" r="7" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 2L12 22"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default PoisonCounterIcon;
