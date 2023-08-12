import { Switch, TouchableHighlight, View } from 'react-native';
import { ReactNode } from 'react';
import styles from './MenuItemStyles';
import { ThemedText } from '../../../helpers/components/ThemeComponents';

interface propTypes {
	children: ReactNode;
	switchValue: boolean;
	callback: () => void;
}

export default function MenuToggleItem({
	children,
	switchValue,
	callback = () => null,
}: propTypes) {
	return (
		<TouchableHighlight style={styles.touchable} onPress={callback}>
			<View style={styles.container}>
				<ThemedText style={styles.text}>{children}</ThemedText>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					ios_backgroundColor="#3e3e3e"
					value={switchValue}
					onValueChange={callback}
				/>
			</View>
		</TouchableHighlight>
	);
}
