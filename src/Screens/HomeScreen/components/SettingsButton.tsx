import { Text, TouchableHighlight } from "react-native";
import styles from "../HomeScreenStyles";

export default function SettingsButton() {
    return (
        <TouchableHighlight style={styles.settingsButton} underlayColor="rgba(0, 0, 0, 0.6)" onPress={() => null}>
            <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.buttonText}
            >
              Configurações
            </Text>
          </TouchableHighlight>
    )
}