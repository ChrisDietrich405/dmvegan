import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.replace("Home"); // Navigate to the home screen after splash
		}, 3000); // Show splash for 3 seconds
	}, []);

	return (
		<View style={styles.container}>
			<Text>Welcome to My App</Text>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Splash</ThemedText>
			</ThemedView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SplashScreen;
