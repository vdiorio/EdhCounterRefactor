import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

export default function LoadingAnimated() {
	const logo = require('../../assets/icon.png');

	const spinValue = new Animated.Value(0);
	Animated.loop(
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true,
		}),
	).start();

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.spinner,
					{
						transform: [
							{
								rotate: spinValue.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '360deg'],
								}),
							},
						],
					},
				]}
			/>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={logo} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	spinner: {
		position: 'absolute',
		width: '28%',
		alignItems: 'center',
		justifyContent: 'center',
		aspectRatio: 1,
		borderRightColor: '#b3b2b2',
		borderTopColor: 'black',
		borderWidth: 3,
		borderRadius: 1000,
		overflow: 'hidden',
	},
	imageContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '30%',
		aspectRatio: 1,
		overflow: 'hidden',
	},
	image: {
		position: 'absolute',
		width: '80%',
		height: '80%',
		borderRadius: 1000,
	},
});
