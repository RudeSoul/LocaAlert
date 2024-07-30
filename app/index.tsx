import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { OnboardFlow } from 'react-native-onboard';
export default function Page() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text className="text-xl">Welcome to LocaAlert</Text>

			<Link
				href="(tabs)/alarms"
				asChild
			>
				<Pressable>
					<Text className="mt-5 py-3 px-5 text-xl bg-gray-200 rounded-lg border border-green-700 text-green-700">
						Get Started
					</Text>
				</Pressable>
			</Link>

			<OnboardFlow
				pages={[
					{
						title: 'Welcome to my app',
						subtitle: 'Connect your bank account now and start saving money.',
						imageUri: 'https://frigade.com/img/demo.png'
					},
					{
						title: 'Buy cool stuff',
						subtitle: 'Remember that ice cream you wanted to buy?',
						imageUri:
							'https://illlustrations.co/static/15d8c30e1f77fd78c3b83b9fca9c3a92/day81-ice-cream.png'
					},
					{
						title: 'The right tools',
						subtitle:
							'Our app can do anything. Literally anything. We are that good.',
						imageUri:
							'https://illlustrations.co/static/a547d1bc532ad86a13dd8f47d754f0a1/day77-pocket-knief.png'
					}
				]}
				type={'fullscreen'}
			/>
		</View>
	);
}
