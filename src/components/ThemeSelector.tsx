import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { useColorScheme } from 'nativewind';
// import lightModeIcon from '@assets/icons/lightMode.png';
// import darkModeIcon from '@assets/icons/darkMode.png';

export default function ThemeSelector() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	const icon =
		colorScheme === 'dark'
			? require('../../assets/icons/lightMode.png')
			: require('../../assets/icons/darkMode.png');

	return (
		<View className="absolute bottom-3 right-3">
			<TouchableHighlight onPress={toggleColorScheme}>
				<Image source={icon} />
				{/* <Text
				onPress={toggleColorScheme}
				className="border-red-900 bg-zinc-200 h-full "
			>
				Toggle Theme
			</Text> */}
			</TouchableHighlight>
		</View>
	);
}
