import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface InputProps {
  initialValue: string | number;
  onConfirm: (number: number) => void;
  onCancel: () => void;
  fontSize?: number;
  props?: TextInputProps;
}

const NumberInput = ({
  initialValue,
  onConfirm,
  onCancel,
  fontSize = 48,
  props,
}: InputProps) => {
  const [text, setText] = useState(String(initialValue));
  const handleTextChange = (text: string) =>
    setText(text.replace(/[^0-9]/g, ""));
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { fontSize }]}
        value={text}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        autoFocus
        {...props}
      />
      <TouchableOpacity onPress={() => onConfirm(parseInt(text))}>
        <Icon
          name="check"
          size={fontSize * 0.8}
          color="green"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Icon
          name="close"
          size={fontSize * 0.8}
          color="red"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    zIndex: 20,
    position: "absolute",
    top: 50,
  },
  input: {
    flex: 1,
    color: "#333",
    textAlign: "center",
  },
  icon: {
    marginLeft: 8,
  },
});

export default NumberInput;
