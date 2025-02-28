import React from "react";
import Svg, { Path } from "react-native-svg";

const MinusIcon = ({ size = 24, color = "black" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12H22" /* Now extends fully from left to right */
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MinusIcon;
