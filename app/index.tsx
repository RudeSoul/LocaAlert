import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function Page() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ fontSize: 20 }}>Welcome to LocaAlert</Text>

			<Link
				href="(tabs)/alarms"
				asChild
			>
				<Pressable>
					<Text
						style={{
							fontSize: 20,
							paddingTop: 14,
							paddingBottom: 14,
							paddingRight: 18,
							paddingLeft: 18,
							marginTop: 20,
							backgroundColor: '#ddd',
							color: 'green',
							borderRadius: 8,
							borderColor: 'green',
							borderWidth: 0.8
						}}
					>
						Get Started
					</Text>
				</Pressable>
			</Link>
		</View>
	);
}
