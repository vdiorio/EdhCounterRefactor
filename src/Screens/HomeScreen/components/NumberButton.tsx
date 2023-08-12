import { Image, Text, TouchableHighlight, View } from 'react-native';
import styles from '../HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../../Routes';

export default function NumberButton({ playerId }: { playerId: string }) {
	const sword = require('../../../../assets/Sword.png');
	const navigation = useNavigation<StackTypes>();

	return (
		<View style={styles.touchableContainer}>
			<Image source={sword} style={styles.sword} />
			<TouchableHighlight
				style={styles.button}
				underlayColor="rgba(0, 0, 0, 0.6)"
				onPress={() => navigation.navigate('Settings')}
			>
				<Text adjustsFontSizeToFit numberOfLines={1} style={styles.buttonText}>
					{playerId}
				</Text>
			</TouchableHighlight>
		</View>
	);
}
