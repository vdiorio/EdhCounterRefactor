import { StyleSheet } from 'react-native';
import { Wpercentage, Hpercentage } from '../../../helpers/getWindowPercentage';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: Wpercentage(5),
	},
	touchable: {
		height: Hpercentage(7),
		borderColor: 'lightgray',
		borderBottomWidth: 1,
	},
	text: {
		fontSize: Wpercentage(6),
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default styles;
