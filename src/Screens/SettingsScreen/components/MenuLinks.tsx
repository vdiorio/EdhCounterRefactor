import { TouchableHighlight, View } from 'react-native';
import styles from './MenuItemStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemedText } from '../../../helpers/components/ThemeComponents';

export default function MenuLinks() {
	return (
		<>
			<TouchableHighlight style={styles.touchable} onPress={() => null}>
				<View style={styles.container}>
					<ThemedText style={styles.text}>Avalie o EdhCounter</ThemedText>
					<ThemedText>
						<FontAwesome name="chevron-right" />
					</ThemedText>
				</View>
			</TouchableHighlight>
			<TouchableHighlight style={styles.touchable} onPress={() => null}>
				<View style={styles.container}>
					<ThemedText style={styles.text}>Mande um feedback</ThemedText>
				</View>
			</TouchableHighlight>
		</>
	);
}
