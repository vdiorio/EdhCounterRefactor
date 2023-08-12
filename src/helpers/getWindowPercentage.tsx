import { Dimensions } from 'react-native';

export function Hpercentage(percentage: number) {
	return Dimensions.get('window').height * (percentage / 100);
}

export function Wpercentage(percentage: number) {
	return Dimensions.get('window').width * (percentage / 100);
}
