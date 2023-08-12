import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		backgroundColor: 'rgb(24, 23, 28)',
		justifyContent: 'space-evenly',
		paddingBottom: 60,
		padding: '10%',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	logoContainer: {
		height: '30%',
		aspectRatio: 1,
		alignSelf: 'center',
		marginTop: '5%',
		maxHeight: Dimensions.get('window').width / 1.8,
	},
	titleContainer: {
		height: '16%',
		aspectRatio: 3,
		maxHeight: Dimensions.get('window').width / 3.2,
	},
	text: {
		color: '#aa9877',
		fontSize: RFValue(17, 800),
	},
	sword: {
		width: '90%',
		height: '90%',
		position: 'absolute',
	},
	button: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'serif',
		fontSize: 200,
		textAlign: 'center',
		color: 'white',
		textShadowColor: 'black',
		textShadowOffset: { width: RFValue(1, 800), height: RFValue(1, 800) },
		textShadowRadius: RFValue(4, 800),
	},
	touchableContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '20%',
		aspectRatio: 1,
		borderColor: '#b3b2b2',
		borderWidth: 1,
		marginVertical: '5%',
		borderRadius: 15,
		overflow: 'hidden',
	},
	buttonContainer: {
		width: '70%',
		height: RFValue(1, 2),
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	settingsButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '20%',
		width: '100%',
		borderColor: '#b3b2b2',
		borderWidth: 1,
		borderRadius: 15,
		overflow: 'hidden',
	},
});

export default styles;
