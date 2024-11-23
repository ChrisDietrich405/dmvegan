import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon, CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function RecoverPassword() {
	const [email, setEmail] = useState("");
	const [secureText, setSecureText] = useState(true);

	const navigation = useNavigation();

	const handleResetPassword = () => {
		fetch("http://localhost:3001/v1/api/users", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
		},
		image: {
			width: 258,
			height: 82,
			marginBottom: 20,
			alignSelf: "center",
			borderRadius: 8,
		},
		forgotPasswordText: {
			color: "#007bff",
			textAlign: "right",
			marginBottom: 20,
			textDecorationLine: "underline",
			fontSize: 14,
		},
		button: {
			backgroundColor: "#288528",
			color: "blue",
			marginTop: 10,
			fontSize: 12,
		},
		loginText: {
			fontSize: 16,
			fontWeight: "bold",
			textAlign: "center", // Optional: Align text to the center
			marginBottom: 60, // Optional: Add spacing below the text
		},
		loginSubText: {
			fontSize: 12,
			textAlign: "center", // Optional: Align text to the center
			marginBottom: 120, // Optional: Add spacing below the text
		},
		checkboxContainer: {
			flexDirection: "row",
			alignItems: "center",
		},
		text: {
			// Space between the checkbox and the text
			fontSize: 8,
		},
	});

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				resizeMode="cover"
				source={require("../../assets/images/logo2.png")}
			/>
			<Text style={styles.loginText}>Recover Password</Text>
			<Text style={styles.loginSubText}>
				Add your email in order to recover your password
			</Text>

			<Input
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
				inputStyle={{ fontSize: 12 }}
			/>

			<Button
				titleStyle={{ fontSize: 16 }}
				title="Send me an email"
				onPress={() => {
					handleResetPassword();
				}}
				buttonStyle={styles.button}
			/>
		</View>
	);
}
