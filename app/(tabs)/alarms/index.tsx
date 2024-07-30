import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from 'geolib';
import { Alarm, LocationCoords } from './utils';
import MapModal from './components/MapModal';
import DistanceModal from './components/DistanceModal';
import AlarmList from './components/AlarmList';

export default function App() {
	const [location, setLocation] = useState<LocationCoords | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [alarms, setAlarms] = useState<Alarm[]>([]);
	const [selectedLocation, setSelectedLocation] =
		useState<LocationCoords | null>(null);
	const [mapVisible, setMapVisible] = useState<boolean>(false);
	const [distanceModalVisible, setDistanceModalVisible] =
		useState<boolean>(false);
	const [distance, setDistance] = useState<string>('10000');
	const [days, setDays] = useState<boolean[]>(Array(7).fill(false));
	const [specificDate, setSpecificDate] = useState<Date | null>(null);
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [useSpecificDate, setUseSpecificDate] = useState<boolean>(false);

	const notificationListener = useRef<any>();
	const responseListener = useRef<any>();

	useEffect(() => {
		loadAlarms();

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			console.log('Location permission status:', status);
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let { status: notificationStatus } =
				await Notifications.requestPermissionsAsync();
			console.log('Notification permission status:', notificationStatus);
			if (notificationStatus !== 'granted') {
				setErrorMsg('Permission to send notifications was denied');
				return;
			}

			let loc = await Location.getCurrentPositionAsync({});
			console.log('Current location:', loc);
			setLocation(loc.coords);

			Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 1000,
					distanceInterval: 1
				},
				(newLocation) => {
					console.log('Updated location:', newLocation);
					setLocation(newLocation.coords);
					checkAlarms(newLocation.coords);
				}
			);

			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: true,
					shouldSetBadge: false
				})
			});
		})();

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				console.log('Notification received:', notification);
			}
		);

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log('Notification response:', response);
			});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	const loadAlarms = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@alarms');
			if (jsonValue !== null) {
				setAlarms(JSON.parse(jsonValue));
			}
		} catch (e) {
			console.log('Error loading alarms:', e);
		}
	};

	const saveAlarms = async (newAlarms: Alarm[]) => {
		try {
			await AsyncStorage.setItem('@alarms', JSON.stringify(newAlarms));
			setAlarms(newAlarms); // Update state with the new alarms
		} catch (e) {
			console.log('Error saving alarms:', e);
		}
	};

	const checkAlarms = (currentLocation: LocationCoords) => {
		alarms.forEach((alarm) => {
			const dist = getDistance(
				{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude
				},
				{ latitude: alarm.latitude, longitude: alarm.longitude }
			);

			console.log(`Distance to alarm (ID: ${alarm.id}): ${dist} meters`);

			const today = new Date();
			const dayOfWeek = today.getDay();
			const isDaySelected = alarm.days[dayOfWeek];
			const isSpecificDate =
				alarm.specificDate &&
				new Date(alarm.specificDate).toDateString() === today.toDateString();

			console.log(
				`Alarm (ID: ${alarm.id}) days: ${alarm.days}, Day selected: ${isDaySelected}, Specific date: ${alarm.specificDate}, Is specific date: ${isSpecificDate}`
			);

			if (
				dist <= alarm.distance &&
				(isDaySelected || isSpecificDate) &&
				alarm.active
			) {
				console.log('Triggering alarm (ID: ' + alarm.id + ')');
				triggerAlarm(alarm);
			}
		});
	};

	const triggerAlarm = async (alarm: Alarm) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Alarm!',
				body: 'You have reached your destination.',
				sound: true
			},
			trigger: null
		});
		const updatedAlarms = alarms.filter((a) => a.id !== alarm.id);
		saveAlarms(updatedAlarms);
	};

	const setAlarm = () => {
		if (selectedLocation && distance) {
			const newAlarm: Alarm = {
				id: `${Date.now()}`,
				latitude: selectedLocation.latitude,
				longitude: selectedLocation.longitude,
				distance: parseInt(distance),
				days: days.some(Boolean)
					? days
					: days.map((_, index) => index === new Date().getDay()),
				specificDate: useSpecificDate ? specificDate : null,
				active: true
			};
			console.log('Setting new alarm:', newAlarm);
			const updatedAlarms = [...alarms, newAlarm];
			saveAlarms(updatedAlarms);
			setSelectedLocation(null);
			setMapVisible(false);
			setDistanceModalVisible(false);
			setDistance('10000');
			setDays(Array(7).fill(false));
			setUseSpecificDate(false);
			setSpecificDate(null);
		} else {
			Alert.alert('Error', 'Please set a valid distance.');
		}
	};

	const toggleAlarm = (id: string) => {
		console.log('Toggling alarm (ID: ' + id + ')');
		const updatedAlarms = alarms.map((alarm) =>
			alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
		);
		saveAlarms(updatedAlarms);
	};

	const deleteAlarm = (id: string) => {
		console.log('Deleting alarm (ID: ' + id + ')');
		const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
		saveAlarms(updatedAlarms);
	};

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
	}

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 50,
				paddingHorizontal: 20,
				backgroundColor: '#fff'
			}}
		>
			<Text>{text}</Text>
			<TouchableOpacity
				onPress={() => setMapVisible(true)}
				style={{
					backgroundColor: '#007bff',
					padding: 10,
					marginVertical: 10,
					borderRadius: 5,
					alignItems: 'center'
				}}
			>
				<Text style={{ color: '#fff', fontWeight: 'bold' }}>Select Location</Text>
			</TouchableOpacity>
			<AlarmList
				alarms={alarms}
				toggleAlarm={toggleAlarm}
				deleteAlarm={deleteAlarm}
			/>
			<MapModal
				visible={mapVisible}
				location={location}
				selectedLocation={selectedLocation}
				setSelectedLocation={setSelectedLocation}
				setMapVisible={setMapVisible}
				setDistanceModalVisible={setDistanceModalVisible}
			/>
			<DistanceModal
				visible={distanceModalVisible}
				distance={distance}
				setDistance={setDistance}
				days={days}
				setDays={setDays}
				useSpecificDate={useSpecificDate}
				setUseSpecificDate={setUseSpecificDate}
				specificDate={specificDate}
				setSpecificDate={setSpecificDate}
				showDatePicker={showDatePicker}
				setShowDatePicker={setShowDatePicker}
				setAlarm={setAlarm}
				setDistanceModalVisible={setDistanceModalVisible}
			/>
		</View>
	);
}
