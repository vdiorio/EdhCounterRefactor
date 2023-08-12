import { Image, SafeAreaView, Text, View } from 'react-native';
import styles from './HomeScreenStyles';
import NumberButton from './components/NumberButton';
import SettingsButton from './components/SettingsButton';

export default function HomeScreen() {
	const playerIds = [1, 2, 3, 4, 5, 6];
	const logo = require('../../../assets/Logo.png');
	const title = require('../../../assets/Title.png');

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.logoContainer}>
				<Image style={styles.image} source={logo} />
			</View>
			<View style={styles.titleContainer}>
				<Image style={styles.image} source={title} />
			</View>
			<Text adjustsFontSizeToFit style={styles.text}>
				Selecione o número de jogadores:
			</Text>
			<View style={styles.buttonContainer}>
				{playerIds.map((playerId) => (
					<NumberButton key={playerId} playerId={String(playerId)} />
				))}
				<SettingsButton />
			</View>
		</SafeAreaView>
	);
}
