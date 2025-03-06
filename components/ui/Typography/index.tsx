import { Text, useColorScheme, TextProps } from "react-native";

interface Props extends TextProps {
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
    <Text
      style={[{ color: color[colorScheme], flexWrap: "nowrap" }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
