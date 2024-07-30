import React from 'react';
import { Modal, View, Text, TextInput, Button, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { AlarmDays } from '../utils';

interface DistanceModalProps {
	visible: boolean;
	distance: string;
	setDistance: (distance: string) => void;
	days: AlarmDays;
	setDays: (days: AlarmDays) => void;
	useSpecificDate: boolean;
	setUseSpecificDate: (useSpecificDate: boolean) => void;
	specificDate: Date | null;
	setSpecificDate: (specificDate: Date | null) => void;
	showDatePicker: boolean;
	setShowDatePicker: (showDatePicker: boolean) => void;
	setAlarm: () => void;
	setDistanceModalVisible: (visible: boolean) => void;
}

const DistanceModal: React.FC<DistanceModalProps> = ({
	visible,
	distance,
	setDistance,
	days,
	setDays,
	useSpecificDate,
	setUseSpecificDate,
	specificDate,
	setSpecificDate,
	showDatePicker,
	setShowDatePicker,
	setAlarm,
	setDistanceModalVisible
}) => {
	const handleDateChange = (event: any, selectedDate: Date | undefined) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setSpecificDate(selectedDate);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.5)'
				}}
			>
				<View
					style={{
						width: '80%',
						padding: 20,
						backgroundColor: 'white',
						borderRadius: 10,
						alignItems: 'center'
					}}
				>
					<Text>Set Distance (meters):</Text>
					<TextInput
						style={{
							width: '100%',
							padding: 10,
							borderWidth: 1,
							borderColor: '#ccc',
							marginVertical: 10,
							borderRadius: 5
						}}
						keyboardType="numeric"
						value={distance}
						onChangeText={setDistance}
					/>
					<Text>Select Days:</Text>
					{[
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday'
					].map((day, index) => (
						<View
							key={index}
							style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
						>
							<Checkbox
								value={days[index]}
								onValueChange={(newValue) => {
									const newDays = [...days];
									newDays[index] = newValue;
									setDays(newDays);
								}}
							/>
							<Text>{day}</Text>
						</View>
					))}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginVertical: 5
						}}
					>
						<Text>Specific Date</Text>
						<Switch
							value={useSpecificDate}
							onValueChange={setUseSpecificDate}
						/>
					</View>
					{useSpecificDate && (
						<>
							<Button
								title="Pick Date"
								onPress={() => setShowDatePicker(true)}
							/>
							{showDatePicker && (
								<DateTimePicker
									value={specificDate || new Date()}
									mode="date"
									display="default"
									onChange={handleDateChange}
								/>
							)}
							{specificDate && (
								<Text>Selected Date: {specificDate.toLocaleDateString()}</Text>
							)}
						</>
					)}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
							width: '100%'
						}}
					>
						<Button
							title="Set Alarm"
							onPress={setAlarm}
						/>
						<Button
							title="Cancel"
							onPress={() => setDistanceModalVisible(false)}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default DistanceModal;
