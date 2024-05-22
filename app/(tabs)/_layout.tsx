import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function _layout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="alarms"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather
							name="bell"
							size={24}
							color={color}
						/>
					),
					tabBarLabel: 'Alarms',
					headerTitle: 'Alarms'
				}}
			/>
			<Tabs.Screen
				name="activities"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather
							name="activity"
							size={24}
							color={color}
						/>
					),
					tabBarLabel: 'Activities',
					headerTitle: 'Activities'
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather
							name="settings"
							size={24}
							color={color}
						/>
					),
					tabBarLabel: 'Settings',
					headerTitle: 'Settings'
				}}
			/>
		</Tabs>
	);
}
