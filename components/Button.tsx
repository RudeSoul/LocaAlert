import { Text, Pressable } from 'react-native';
import tw from 'twrnc';

interface IButton {
	text: string;
	style?: string;
	textStyle?: string;
	onPress: () => void;
}

export default function Button(props: IButton) {
	const { text, onPress } = props;
	let style = 'bg-green-500';
	if (props.style) style = props.style;
	let textStyle = 'text-white justify-center self-center';
	if (props.textStyle) textStyle = props.textStyle;

	return (
		<Pressable
			style={tw`m-1 p-3 ${style}`}
			onPress={onPress}
		>
			<Text style={tw`${textStyle}`}>{text}</Text>
		</Pressable>
	);
}
