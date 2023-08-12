import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import { ContextType, ThemeContext } from '../../contexts/ThemeContext';
import Animated, {
	withTiming,
	useAnimatedStyle,
	interpolateColor,
	useDerivedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface props {
	children: ReactNode | string;
	style?: object;
	colorDark?: string;
	colorLight?: string;
}

export function ThemedText({
	children,
	colorDark = '#F5F3F0',
	colorLight = '#18171c',
	style,
}: props) {
	const { theme } = useContext(ThemeContext) as ContextType;

	const progress = useDerivedValue(() => withTiming(theme === 'dark' ? 0 : 1));

	const Rcolor = useAnimatedStyle(() => {
		const color = interpolateColor(
			progress.value,
			[0, 1],
			[colorDark, colorLight],
		);
		return { color };
	});

	return (
		<Animated.Text
			style={[style, Rcolor]}
			adjustsFontSizeToFit
			numberOfLines={1}
		>
			{children}
		</Animated.Text>
	);
}

export function ThemedBackground({ children }: PropsWithChildren) {
	const { theme } = useContext(ThemeContext) as ContextType;
	const colorDark = '#F5F3F0';
	const colorLight = '#18171c';

	const progress = useDerivedValue(() => withTiming(theme === 'dark' ? 1 : 0));

	const Rcolor = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[colorDark, colorLight],
		);
		return { backgroundColor };
	});

	return (
		<Animated.View style={[style.container, Rcolor]}>{children}</Animated.View>
	);
}

const style = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
});
