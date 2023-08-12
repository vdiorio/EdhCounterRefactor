import { Text, TouchableHighlight } from 'react-native';
import styles from '../HomeScreenStyles';

export default function SettingsButton({ onPress }: { onPress: () => void }) {
	return (
		<TouchableHighlight
			style={styles.settingsButton}
			underlayColor="rgba(0, 0, 0, 0.6)"
			onPress={onPress}
		>
			<Text adjustsFontSizeToFit numberOfLines={1} style={styles.buttonText}>
				Configurações
			</Text>
		</TouchableHighlight>
	);
}
