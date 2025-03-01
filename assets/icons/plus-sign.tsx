import React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ size = 24, color = "#1a1a1a", opacity = 1 }) => {
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
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;
