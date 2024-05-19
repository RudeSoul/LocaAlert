import React from 'react';
import { Text, Pressable } from 'react-native';

interface IButton {
	text: string;
	style?: string;
	textStyle?: string;
	onPress?: () => void;
}

export default function Button(props: IButton) {
	const { text, onPress } = props;
	let style = 'bg-green-500';
	if (props.style) style = props.style;
	let textStyle = 'text-white justify-center self-center';
	if (props.textStyle) textStyle = props.textStyle;

	return (
		<Pressable
			className={`m-1 p-3 ${style}`}
			onPress={onPress}
		>
			<Text className={`${textStyle}`}>{text}</Text>
		</Pressable>
	);
}
