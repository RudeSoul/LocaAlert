import React from 'react';
import { FlatList } from 'react-native';
import { Alarm } from '../utils';
import AlarmItem from './AlarmItem';

interface AlarmListProps {
	alarms: Alarm[];
	toggleAlarm: (id: string) => void;
	deleteAlarm: (id: string) => void;
}

const AlarmList: React.FC<AlarmListProps> = ({
	alarms,
	toggleAlarm,
	deleteAlarm
}) => {
	return (
		<FlatList
			data={alarms}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<AlarmItem
					alarm={item}
					toggleAlarm={toggleAlarm}
					deleteAlarm={deleteAlarm}
				/>
			)}
		/>
	);
};

export default AlarmList;
