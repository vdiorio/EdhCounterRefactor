import { Image, Text, TouchableHighlight, View } from 'react-native';
import styles from '../HomeScreenStyles';

export default function NumberButton({ playerId }: { playerId: string }) {
	const sword = require('../../../../assets/Sword.png');

	return (
		<View style={styles.touchableContainer}>
			<Image source={sword} style={styles.sword} />
			<TouchableHighlight
				style={styles.button}
				underlayColor="rgba(0, 0, 0, 0.6)"
				onPress={() => null}
			>
				<Text adjustsFontSizeToFit numberOfLines={1} style={styles.buttonText}>
					{playerId}
				</Text>
			</TouchableHighlight>
		</View>
	);
}
