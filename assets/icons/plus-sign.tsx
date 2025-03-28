import React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({
  size = 24,
  color = "#121212",
  opacity = 1,
  strokeWidth = "4",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
    >
      <Path
        d="M12 2V22M2 12H22" /* Now extends fully in both directions */
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;
