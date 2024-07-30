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

			{/* <OnboardFlow
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
			/> */}
		</View>
	);
}

// import React, { useState, useEffect, useRef } from 'react';
// import {
// 	StyleSheet,
// 	View,
// 	Text,
// 	Button,
// 	FlatList,
// 	TouchableOpacity,
// 	Modal,
// 	TextInput,
// 	Alert,
// 	Switch
// } from 'react-native';
// import MapView, { Marker, MapPressEvent } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getDistance } from 'geolib';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Checkbox from 'expo-checkbox';

// interface Alarm {
// 	id: string;
// 	latitude: number;
// 	longitude: number;
// 	distance: number;
// 	days: boolean[];
// 	specificDate: Date | null;
// 	active: boolean;
// }

// export default function App() {
// 	const [location, setLocation] = useState<Location.LocationObjectCoords | null>(
// 		null
// 	);
// 	const [errorMsg, setErrorMsg] = useState<string | null>(null);
// 	const [alarms, setAlarms] = useState<Alarm[]>([]);
// 	const [selectedLocation, setSelectedLocation] = useState<{
// 		latitude: number;
// 		longitude: number;
// 	} | null>(null);
// 	const [mapVisible, setMapVisible] = useState<boolean>(false);
// 	const [distance, setDistance] = useState<string>('100');
// 	const [distanceModalVisible, setDistanceModalVisible] =
// 		useState<boolean>(false);
// 	const [days, setDays] = useState<boolean[]>([
// 		false,
// 		false,
// 		false,
// 		false,
// 		false,
// 		false,
// 		false
// 	]);
// 	const [specificDate, setSpecificDate] = useState<Date | null>(null);
// 	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
// 	const [useSpecificDate, setUseSpecificDate] = useState<boolean>(false);

// 	const notificationListener = useRef<any>();
// 	const responseListener = useRef<any>();

// 	useEffect(() => {
// 		loadAlarms();

// 		(async () => {
// 			let { status } = await Location.requestForegroundPermissionsAsync();
// 			if (status !== 'granted') {
// 				setErrorMsg('Permission to access location was denied');
// 				return;
// 			}

// 			let { status: notificationStatus } =
// 				await Notifications.requestPermissionsAsync();
// 			if (notificationStatus !== 'granted') {
// 				setErrorMsg('Permission to send notifications was denied');
// 				return;
// 			}

// 			let loc = await Location.getCurrentPositionAsync({});
// 			setLocation(loc.coords);

// 			Location.watchPositionAsync(
// 				{
// 					accuracy: Location.Accuracy.High,
// 					timeInterval: 1000,
// 					distanceInterval: 1
// 				},
// 				(newLocation) => {
// 					setLocation(newLocation.coords);
// 					checkAlarms(newLocation.coords);
// 				}
// 			);

// 			Notifications.setNotificationHandler({
// 				handleNotification: async () => ({
// 					shouldShowAlert: true,
// 					shouldPlaySound: true,
// 					shouldSetBadge: false
// 				})
// 			});
// 		})();

// 		notificationListener.current = Notifications.addNotificationReceivedListener(
// 			(notification) => {
// 				console.log(notification);
// 			}
// 		);

// 		responseListener.current =
// 			Notifications.addNotificationResponseReceivedListener((response) => {
// 				console.log(response);
// 			});

// 		return () => {
// 			Notifications.removeNotificationSubscription(notificationListener.current);
// 			Notifications.removeNotificationSubscription(responseListener.current);
// 		};
// 	}, []);

// 	const checkAlarms = (currentLocation: Location.LocationObjectCoords) => {
// 		alarms.forEach((alarm) => {
// 			const dist = getDistance(
// 				{
// 					latitude: currentLocation.latitude,
// 					longitude: currentLocation.longitude
// 				},
// 				{ latitude: alarm.latitude, longitude: alarm.longitude }
// 			);

// 			const today = new Date();
// 			const dayOfWeek = today.getDay();
// 			const isDaySelected = alarm.days[dayOfWeek];
// 			const isSpecificDate =
// 				alarm.specificDate &&
// 				new Date(alarm.specificDate).toDateString() === today.toDateString();

// 			if (
// 				dist <= alarm.distance &&
// 				(isDaySelected || isSpecificDate) &&
// 				alarm.active
// 			) {
// 				triggerAlarm(alarm);
// 			}
// 		});
// 	};

// 	const triggerAlarm = async (alarm: Alarm) => {
// 		await Notifications.scheduleNotificationAsync({
// 			content: {
// 				title: 'Alarm!',
// 				body: 'You have reached your destination.',
// 				sound: true
// 			},
// 			trigger: null
// 		});
// 		setAlarms(alarms.filter((a) => a.id !== alarm.id));
// 		saveAlarms();
// 	};

// 	const loadAlarms = async () => {
// 		try {
// 			const jsonValue = await AsyncStorage.getItem('@alarms');
// 			if (jsonValue !== null) {
// 				setAlarms(JSON.parse(jsonValue));
// 			}
// 		} catch (e) {
// 			console.log('Error loading alarms:', e);
// 		}
// 	};

// 	const saveAlarms = async () => {
// 		try {
// 			await AsyncStorage.setItem('@alarms', JSON.stringify(alarms));
// 		} catch (e) {
// 			console.log('Error saving alarms:', e);
// 		}
// 	};

// 	const handleMapPress = (event: MapPressEvent) => {
// 		const { latitude, longitude } = event.nativeEvent.coordinate;
// 		setSelectedLocation({ latitude, longitude });
// 		setDistanceModalVisible(true);
// 	};

// 	const setAlarm = () => {
// 		if (selectedLocation && distance) {
// 			const newAlarm: Alarm = {
// 				id: `${Date.now()}`,
// 				latitude: selectedLocation.latitude,
// 				longitude: selectedLocation.longitude,
// 				distance: parseInt(distance),
// 				days: days.some(Boolean)
// 					? days
// 					: [
// 							new Date().getDay() === 0 ? true : false,
// 							false,
// 							false,
// 							false,
// 							false,
// 							false,
// 							false
// 						],
// 				specificDate: useSpecificDate ? specificDate : null,
// 				active: true
// 			};
// 			setAlarms([...alarms, newAlarm]);
// 			setSelectedLocation(null);
// 			setMapVisible(false);
// 			setDistanceModalVisible(false);
// 			setDistance('100');
// 			setDays([false, false, false, false, false, false, false]);
// 			setUseSpecificDate(false);
// 			setSpecificDate(null);
// 			saveAlarms();
// 		} else {
// 			Alert.alert('Error', 'Please set a valid distance.');
// 		}
// 	};

// 	const toggleAlarm = (id: string) => {
// 		setAlarms(
// 			alarms.map((alarm) =>
// 				alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
// 			)
// 		);
// 		saveAlarms();
// 	};

// 	const handleDateChange = (event: any, selectedDate: Date | undefined) => {
// 		setShowDatePicker(false);
// 		if (selectedDate) {
// 			setSpecificDate(selectedDate);
// 		}
// 	};

// 	let text = 'Waiting..';
// 	if (errorMsg) {
// 		text = errorMsg;
// 	} else if (location) {
// 		text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<Text>{text}</Text>
// 			<TouchableOpacity
// 				onPress={() => setMapVisible(true)}
// 				style={styles.button}
// 			>
// 				<Text style={styles.buttonText}>Select Location</Text>
// 			</TouchableOpacity>
// 			<FlatList
// 				data={alarms}
// 				keyExtractor={(item) => item.id}
// 				renderItem={({ item }) => (
// 					<View style={styles.alarmItem}>
// 						<Text>
// 							Latitude: {item.latitude}, Longitude: {item.longitude}
// 						</Text>
// 						<Text>Distance: {item.distance} meters</Text>
// 						<View style={styles.switchContainer}>
// 							<Text>Active</Text>
// 							<Switch
// 								onValueChange={() => toggleAlarm(item.id)}
// 								value={item.active}
// 							/>
// 						</View>
// 						<Text>
// 							Days:{' '}
// 							{item.days
// 								.map((day, index) =>
// 									day ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'][index] : null
// 								)
// 								.filter(Boolean)
// 								.join(', ')}
// 						</Text>
// 						{item.specificDate && (
// 							<Text>
// 								Specific Date: {new Date(item.specificDate).toLocaleDateString()}
// 							</Text>
// 						)}
// 					</View>
// 				)}
// 			/>
// 			<Modal
// 				visible={mapVisible}
// 				animationType="slide"
// 			>
// 				<View style={styles.mapContainer}>
// 					{location && (
// 						<MapView
// 							style={styles.map}
// 							initialRegion={{
// 								latitude: location.latitude,
// 								longitude: location.longitude,
// 								latitudeDelta: 0.0922,
// 								longitudeDelta: 0.0421
// 							}}
// 							onPress={handleMapPress}
// 						>
// 							{selectedLocation && <Marker coordinate={selectedLocation} />}
// 						</MapView>
// 					)}
// 					<View style={styles.mapButtonContainer}>
// 						<Button
// 							title="Cancel"
// 							onPress={() => setMapVisible(false)}
// 						/>
// 					</View>
// 				</View>
// 			</Modal>
// 			<Modal
// 				visible={distanceModalVisible}
// 				animationType="slide"
// 				transparent={true}
// 			>
// 				<View style={styles.modalContainer}>
// 					<View style={styles.modalContent}>
// 						<Text>Set Distance (meters):</Text>
// 						<TextInput
// 							style={styles.input}
// 							keyboardType="numeric"
// 							value={distance}
// 							onChangeText={setDistance}
// 						/>
// 						<Text>Select Days:</Text>
// 						{[
// 							'Sunday',
// 							'Monday',
// 							'Tuesday',
// 							'Wednesday',
// 							'Thursday',
// 							'Friday',
// 							'Saturday'
// 						].map((day, index) => (
// 							<View
// 								key={index}
// 								style={styles.dayContainer}
// 							>
// 								<Checkbox
// 									value={days[index]}
// 									onValueChange={(newValue) => {
// 										const newDays = [...days];
// 										newDays[index] = newValue;
// 										setDays(newDays);
// 									}}
// 								/>
// 								<Text>{day}</Text>
// 							</View>
// 						))}
// 						<View style={styles.switchContainer}>
// 							<Text>Specific Date</Text>
// 							<Switch
// 								value={useSpecificDate}
// 								onValueChange={setUseSpecificDate}
// 							/>
// 						</View>
// 						{useSpecificDate && (
// 							<>
// 								<Button
// 									title="Pick Date"
// 									onPress={() => setShowDatePicker(true)}
// 								/>
// 								{showDatePicker && (
// 									<DateTimePicker
// 										value={specificDate || new Date()}
// 										mode="date"
// 										display="default"
// 										onChange={handleDateChange}
// 									/>
// 								)}
// 								{specificDate && (
// 									<Text>Selected Date: {specificDate.toLocaleDateString()}</Text>
// 								)}
// 							</>
// 						)}
// 						<View style={styles.modalButtons}>
// 							<Button
// 								title="Set Alarm"
// 								onPress={setAlarm}
// 							/>
// 							<Button
// 								title="Cancel"
// 								onPress={() => setDistanceModalVisible(false)}
// 							/>
// 						</View>
// 					</View>
// 				</View>
// 			</Modal>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingTop: 50,
// 		paddingHorizontal: 20,
// 		backgroundColor: '#fff'
// 	},
// 	button: {
// 		backgroundColor: '#007bff',
// 		padding: 10,
// 		marginVertical: 10,
// 		borderRadius: 5,
// 		alignItems: 'center'
// 	},
// 	buttonText: {
// 		color: '#fff',
// 		fontWeight: 'bold'
// 	},
// 	alarmItem: {
// 		backgroundColor: '#f9f9f9',
// 		padding: 10,
// 		marginVertical: 5,
// 		borderRadius: 5
// 	},
// 	switchContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		marginVertical: 5
// 	},
// 	dayContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginVertical: 5
// 	},
// 	mapContainer: {
// 		flex: 1
// 	},
// 	map: {
// 		flex: 1
// 	},
// 	mapButtonContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		padding: 10,
// 		backgroundColor: '#fff'
// 	},
// 	modalContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(0, 0, 0, 0.5)'
// 	},
// 	modalContent: {
// 		width: '80%',
// 		padding: 20,
// 		backgroundColor: 'white',
// 		borderRadius: 10,
// 		alignItems: 'center'
// 	},
// 	input: {
// 		width: '100%',
// 		padding: 10,
// 		borderWidth: 1,
// 		borderColor: '#ccc',
// 		marginVertical: 10,
// 		borderRadius: 5
// 	},
// 	modalButtons: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		width: '100%'
// 	}
// });
