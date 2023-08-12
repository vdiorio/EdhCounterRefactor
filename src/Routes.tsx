import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen/SettingsScreen';
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type StackNavigation = {
	Home: undefined;
	Settings: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

function Routes() {
	const headerOptions: object = {
		headerShown: true,
		title: 'Configurações',
		headerStyle: {
			backgroundColor: '#aa9877',
			borderBottom: 20,
			borderColor: 'black',
		},
		headerTintColor: '#18171c',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	};

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="Settings"
					component={SettingsScreen}
					options={headerOptions}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
