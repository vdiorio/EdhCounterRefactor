import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import hideNavbar from './src/helpers/hideNavBar';
import LoadingAnimated from './src/helpers/LoadingAnimated';

const loadApp = async (callBack: () => void) => {
	const hideNavBar = NavigationBar.setVisibilityAsync('hidden');
	const loadFonts = Font.loadAsync({
		Beleren: require('./assets/fonts/Beleren.otf'),
		Simplifica: require('./assets/fonts/SIMPLIFICA.otf'),
	});
	await Promise.all([hideNavBar, loadFonts]);
	callBack();
};

export default function App() {
	const [isLoaded, toggleLoad] = useState(false);
	const visibility = NavigationBar.useVisibility();

	useEffect(() => hideNavbar(visibility), [visibility]);

	useEffect(() => {
		loadApp(() => toggleLoad(true));
	}, []);

	return <>{isLoaded ? <HomeScreen /> : <LoadingAnimated />}</>;
}
