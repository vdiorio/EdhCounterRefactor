import React, { PropsWithChildren, useState, createContext } from 'react';

export interface ContextType {
	theme: string;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextType | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState('dark');

	const toggleTheme = () => {
		const newState = theme === 'dark' ? 'light' : 'dark';
		setTheme(newState);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
