import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon, CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountScreen() {
	const [nameOfEvent, setNameOfEvent] = useState("");
	const [date, setDate] = useState("");
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	// const [secureText, setSecureText] = useState(true);

	const navigation = useNavigation();

	const [checked, setChecked] = React.useState(true);
	const toggleCheckbox = () => setChecked(!checked);

	const handleAddEvent = async () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const eventData = {
			nameOfEvent,
			date,
		};

		try {
			const response = await fetch("http://192.168.1.163:3001/v1/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventData),
			});
			console.log("Response", response);

			if (!response.ok) {
				const error = await response.json();
				alert(`Error: ${error.message}`);
				return;
			}

			const data = await response.json();
			console.log("Account created successfully:", data);
			alert("Account created successfully!");
			navigation.navigate("index"); // Navigate back to login page
		} catch (error) {
			console.error("Error creating account:", error);
			alert("Failed to create account. Please try again later.");
		}
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
			marginBottom: 40,
			alignSelf: "center",
			borderRadius: 8,
		},
		button: {
			backgroundColor: "#288528",
			marginTop: 10,
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
			<Text style={styles.loginText}>
				Add your vegan popup or catering event
			</Text>
			<Text style={styles.loginSubText}>
				Add your event information in order to add your event.
			</Text>

			<Input
				placeholder="Name of event"
				value={nameOfEvent}
				onChangeText={setNameOfEvent}
				inputContainerStyle={{
					height: 40, // Adjust height as needed
					marginBottom: 1, // Adjust margin as needed
				}}
				inputStyle={{
					fontSize: 12,
					padding: 1, // Adjust padding as needed
				}}
			/>

			<Input
				placeholder="Date"
				value={date}
				onChangeText={setDate}
				autoCapitalize="none"
				inputStyle={{ fontSize: 12 }}
				containerStyle={{ margin: 1 }}
			/>
			{/* <Input
				placeholder="Time"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
				inputStyle={{ fontSize: 12 }}
				containerStyle={{ margin: 1 }}
			/>

			<Input
				placeholder="Address"
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
			<Input
				placeholder="Description"
				rightIcon={
					<Icon
						name={secureText ? "visibility-off" : "visibility"}
						onPress={() => setSecureText(!secureText)}
					/>
				}
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry={secureText}
				inputStyle={{ fontSize: 12 }}
			/>

			<Input
				placeholder="Event URL"
				rightIcon={
					<Icon
						name={secureText ? "visibility-off" : "visibility"}
						onPress={() => setSecureText(!secureText)}
					/>
				}
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry={secureText}
				inputStyle={{ fontSize: 12 }}
			/> */}
			<View style={styles.checkboxContainer}>
				<CheckBox
					checked={false}
					disabled
					iconType="material-community"
					checkedIcon="checkbox-outline"
					uncheckedIcon="checkbox-blank-outline"
				/>
				<Text style={styles.text}>I agree to the terms and conditions</Text>
			</View>

			<Button
				title="Add event"
				onPress={handleAddEvent}
				buttonStyle={styles.button}
				textStyle={{ color: "#fff" }}
				titleStyle={{ fontSize: 16 }}
			/>

			{/* <TouchableOpacity onPress={() => navigation.navigate("index")}>
				<Text style={{ textAlign: "center", color: "#007bff", marginTop: 10 }}>
					Back to Login
				</Text>
			</TouchableOpacity> */}
		</View>
	);
}
