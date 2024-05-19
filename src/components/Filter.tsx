import React from 'react';
import { View, Text } from 'react-native';

export default function Filter() {
	return (
		<View className="w-screen h-10 bg-slate-600 flex flex-row justify-evenly ">
			<Text className="border-red-900 bg-zinc-200 h-full ">All</Text>
			<Text className="border-red-900 bg-zinc-200 h-full ">Completed</Text>
			<Text className="border-red-900 bg-zinc-200 h-full ">Incomplete</Text>
		</View>
	);
}
