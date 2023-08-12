import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Hpercentage } from '../helpers/getWindowPercentage';

const screenStyle = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		backgroundColor: '#18171c',
		justifyContent: 'space-evenly',
		color: 'green',
		paddingBottom: 60,
		padding: '10%',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: undefined,
	},
	divider: {
		height: Hpercentage(20),
		borderColor: 'lightgray',
		borderBottomWidth: 1,
	},
});

export default screenStyle;
