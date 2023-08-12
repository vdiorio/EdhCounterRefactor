import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import MenuToggleItem from './components/MenuToggleItem';
import screenStyle from '../ScreenContainerStyle';
import MenuLinks from './components/MenuLinks';
import { useContext } from 'react';
import { ContextType, ThemeContext } from '../../contexts/ThemeContext';
import { ThemedBackground } from '../../helpers/components/ThemeComponents';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Wpercentage } from '../../helpers/getWindowPercentage';

export default function SettingsScreen() {
	const { theme, toggleTheme } = useContext(ThemeContext) as ContextType;
	const isDarkMode = theme === 'dark';

	return (
		<ThemedBackground>
			<SafeAreaView style={screenStyle.AndroidSafeArea}>
				<ScrollView style={{ flex: 1 }}>
					<MenuToggleItem switchValue={isDarkMode} callback={toggleTheme}>
						<FontAwesome name="moon-o" size={Wpercentage(6)} />
						<Text>{'  '}DarkMode</Text>
					</MenuToggleItem>
					{/* <MenuToggleItem>Vida inicial</MenuToggleItem>
				<MenuToggleItem>Idioma</MenuToggleItem> */}
					<View style={screenStyle.divider} />
					<MenuLinks />
				</ScrollView>
			</SafeAreaView>
		</ThemedBackground>
	);
}
