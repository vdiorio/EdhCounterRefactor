import { Image, SafeAreaView, Text, View } from 'react-native';
import styles from './HomeScreenStyles';
import NumberButton from './components/NumberButton';
import SettingsButton from './components/SettingsButton';
import screenStyle from '../ScreenContainerStyle';
import { useEffect } from 'react';
import { setStatusBarStyle } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../Routes';

export default function HomeScreen() {
	const playerIds = [1, 2, 3, 4, 5, 6];
	const logo = require('../../../assets/Logo.png');
	const title = require('../../../assets/Title.png');

	const navigation = useNavigation<StackTypes>();

	useEffect(() => {
		setStatusBarStyle('light');
	}, []);

	return (
		<SafeAreaView style={screenStyle.container}>
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
				<SettingsButton onPress={() => navigation.navigate('Settings')} />
			</View>
		</SafeAreaView>
	);
}
