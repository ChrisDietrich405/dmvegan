import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
		},
		image: {
			width: 258,
			height: 82,
			marginBottom: 40,
			alignSelf: "center",
			borderRadius: 8,
		},
		button: {
			backgroundColor: "#288528",
			marginTop: 10,
		},
	});

	return (
		<View style={styles.container}>
			<Text>Hello</Text>
		</View>
	);
}
