import React from 'react';
import { Modal, View, Button } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { LocationCoords } from '../utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface MapModalProps {
	visible: boolean;
	location: LocationCoords | null;
	selectedLocation: LocationCoords | null;
	setSelectedLocation: (location: LocationCoords | null) => void;
	setMapVisible: (visible: boolean) => void;
	setDistanceModalVisible: (visible: boolean) => void;
}

const MapModal: React.FC<MapModalProps> = ({
	visible,
	location,
	selectedLocation,
	setSelectedLocation,
	setMapVisible,
	setDistanceModalVisible
}) => {
	const handleMapPress = (event: MapPressEvent) => {
		const { latitude, longitude } = event.nativeEvent.coordinate;
		setSelectedLocation({ latitude, longitude });
		setDistanceModalVisible(true);
	};
	const handlePlaceSelect = (data: any, details: any) => {
		const { lat, lng } = details.geometry.location;
		setSelectedLocation({ latitude: lat, longitude: lng });
		setDistanceModalVisible(true);
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
		>
			<View style={{ flex: 1 }}>
				{location && (
					<MapView
						style={{ flex: 1 }}
						initialRegion={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
						onPress={handleMapPress}
					>
						{selectedLocation && <Marker coordinate={selectedLocation} />}
					</MapView>
				)}
				<GooglePlacesAutocomplete
					placeholder="Search"
					onPress={handlePlaceSelect}
					query={{
						key: 'key',
						language: 'en'
					}}
					styles={{
						textInputContainer: {
							position: 'absolute',
							top: 10,
							width: '100%',
							zIndex: 1
						},
						textInput: {
							height: 44,
							color: '#5d5d5d',
							fontSize: 16
						}
					}}
					fetchDetails={true}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						padding: 10,
						backgroundColor: '#fff'
					}}
				>
					<Button
						title="Cancel"
						onPress={() => setMapVisible(false)}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default MapModal;
