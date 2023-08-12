import * as NavigationBar from 'expo-navigation-bar';

export default function hideNavbar(
	visibility: NavigationBar.NavigationBarVisibility | null,
) {
	if (visibility === 'visible') {
		const interval = setTimeout(() => {
			NavigationBar.setVisibilityAsync('hidden');
		}, /* 2 Seconds */ 2000);

		return () => {
			clearTimeout(interval);
		};
	}
}
