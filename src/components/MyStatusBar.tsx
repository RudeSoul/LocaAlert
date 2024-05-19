import * as React from 'react';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

export default function MyStatusBar() {
	const { colorScheme } = useColorScheme();
	return colorScheme === 'light' ? (
		<StatusBar style="dark" />
	) : (
		<StatusBar style="light" />
	);
}
