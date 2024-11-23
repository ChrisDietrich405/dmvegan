import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon, CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureText, setSecureText] = useState(true);

	const navigation = useNavigation();

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
			<Text style={styles.loginText}>Login</Text>
			<Text style={styles.loginSubText}>
				Add your email and password in order to sign in
			</Text>

			<Input
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
				inputStyle={{ fontSize: 12 }}
			/>
			<Input
				placeholder="Password"
				rightIcon={
					<Icon
						name={secureText ? "visibility-off" : "visibility"}
						onPress={() => setSecureText(!secureText)}
					/>
				}
				value={password}
				onChangeText={setPassword}
				secureTextEntry={secureText}
				inputStyle={{ fontSize: 12 }}
			/>
			<TouchableOpacity>
				<Text
					onPress={() => navigation.navigate("recover-password")}
					style={styles.forgotPasswordText}
				>
					Forgot Password
				</Text>
			</TouchableOpacity>
			<View style={styles.checkboxContainer}>
				<CheckBox
					checked={false}
					disabled
					iconType="material-community"
					checkedIcon="checkbox-outline"
					uncheckedIcon="checkbox-blank-outline"
				/>
				<Text style={styles.text}>Remember password</Text>
			</View>

			<Button
				titleStyle={{ fontSize: 16 }}
				title="Login"
				onPress={() => {
					// Handle login
				}}
				buttonStyle={styles.button}
			/>

			<Button
				titleStyle={{ fontSize: 16 }}
				title="Create Account"
				onPress={() => navigation.navigate("create-account")}
				buttonStyle={styles.button}
			/>
		</View>
	);
}
