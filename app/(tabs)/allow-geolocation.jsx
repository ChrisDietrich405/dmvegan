import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
	Platform,
} from "react-native";
import * as Location from "expo-location"; // If using Expo

export default function AllowGeolocation({ navigation }) {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	// Function to request location permission and get the user's location
	const requestLocationPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			Alert.alert(
				"Permission Denied",
				"Enable location access to use this feature."
			);
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		Alert.alert(
			"Location Access Granted",
			`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
		);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
			backgroundColor: "#f9f9f9",
		},
		title: {
			fontSize: 22,
			textAlign: "center",
			marginBottom: 20,
			fontWeight: "bold",
		},
		description: {
			fontSize: 16,
			textAlign: "center",
			marginBottom: 40,
			color: "#555",
		},
		button: {
			backgroundColor: "#288528",
			padding: 15,
			borderRadius: 8,
		},
		buttonText: {
			textAlign: "center",
			color: "#fff",
			fontSize: 18,
			fontWeight: "bold",
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Allow Location Access</Text>
			<Text style={styles.description}>
				We use your location to find vegan events and resources near you.
			</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={requestLocationPermission}
			>
				<Text style={styles.buttonText}>Enable Location</Text>
			</TouchableOpacity>
		</View>
	);
}
