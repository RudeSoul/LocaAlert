import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

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
		</View>
	);
}
