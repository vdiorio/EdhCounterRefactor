import { Text, useColorScheme, TextProps } from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedProps } from "react-native-reanimated/lib/typescript/createAnimatedComponent/commonTypes";

interface Props extends AnimatedProps, TextProps {
  scheme?: Scheme;
}

interface Scheme {
  dark: string;
  light: string;
}

export default function Typography({
  style = {},
  children,
  scheme,
  ...props
}: Props) {
  const colorScheme = useColorScheme() || "dark";
  const color = scheme || { dark: "#e0e0e0", light: "#121212" };

  return (
    <Animated.Text
      style={[{ color: color[colorScheme], flexWrap: "nowrap" }, style]}
      {...props}
    >
      {children}
    </Animated.Text>
  );
}
