import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import hideNavbar from './src/helpers/hideNavBar';
import LoadingAnimated from './src/helpers/LoadingAnimated';
import ThemeProvider from './src/contexts/ThemeContext';
import { ThemedBackground } from './src/helpers/components/ThemeComponents';
import Routes from './src/Routes';

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

	return (
		<ThemeProvider>{isLoaded ? <Routes /> : <LoadingAnimated />}</ThemeProvider>
	);
}
