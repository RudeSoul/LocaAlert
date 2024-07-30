import React from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { Alarm } from '../utils';

interface AlarmItemProps {
	alarm: Alarm;
	toggleAlarm: (id: string) => void;
	deleteAlarm: (id: string) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({
	alarm,
	toggleAlarm,
	deleteAlarm
}) => {
	return (
		<View
			style={{
				backgroundColor: '#f9f9f9',
				padding: 10,
				marginVertical: 5,
				borderRadius: 5
			}}
		>
			<Text>
				Latitude: {alarm.latitude}, Longitude: {alarm.longitude}
			</Text>
			<Text>Distance: {alarm.distance} meters</Text>
			<Text>
				Days:{' '}
				{alarm?.days
					?.map((d, i) =>
						d ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i] : ''
					)
					.filter(Boolean)
					.join(', ')}
			</Text>
			{alarm.specificDate && (
				<Text>
					Specific Date: {new Date(alarm?.specificDate).toLocaleDateString()}
				</Text>
			)}
			<Switch
				value={alarm.active}
				onValueChange={() => toggleAlarm(alarm.id)}
			/>
			<Button
				title="Delete"
				onPress={() => deleteAlarm(alarm.id)}
			/>
		</View>
	);
};

export default AlarmItem;
