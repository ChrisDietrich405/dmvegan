//https://rnfirebase.io/#expo
//https://docs.expo.dev/config-plugins/introduction/
//I didn't finish android ssh ./gradlew signingReport at 10 minute mark in the video

import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureText, setSecureText] = useState(true);

	const styles = StyleSheet.create({
		wrapper: {
			marginTop: "100px",
			paddingTop: 8,
			background: "blue",
		},
		fonts: {
			marginBottom: 8,
		},
		user: {
			flexDirection: "column",
			marginBottom: 6,
			minWidth: "100%",
			width: "100%",
		},
		image: {
			width: 258,
			height: 82,
			margin: 30,
			alignSelf: "center",
		},
		name: {
			fontSize: 14,
			marginTop: 5,
		},
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
			<Image
				style={styles.image}
				resizeMode="cover"
				source={require("../../assets/images/logo.png")}
			/>
			<Input
				placeholder="Email"
				leftIcon={<Icon name="email" />}
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
			/>

			<Input
				placeholder="Password"
				leftIcon={<Icon name="lock" />}
				rightIcon={
					<Icon
						name={secureText ? "visibility-off" : "visibility"}
						onPress={() => setSecureText(!secureText)}
					/>
				}
				value={password}
				onChangeText={setPassword}
				secureTextEntry={secureText}
			/>

			<Button
				title="Login"
				onPress={() => {
					// Handle login
				}}
				buttonStyle={{ backgroundColor: "#288528" }}
				textStyle={{ color: "#fff" }}
				selectedButtonStyle={{ backgroundColor: "#B0B9B0" }}
				selectedTextStyle={{ color: "#fff" }}
			/>
		</View>
	);
}

/////////////////////////////////////////////////////////////////////

// import React, { useCallback, useState } from "react";
// import { View, StyleSheet, Image, Linking } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Button, Text, Card, ButtonGroup } from "@rneui/themed";

// export default function HomeComponent() {
// 	const [selectedIndex, setSelectedIndex] = useState(0);
// 	const options = ["Maryland Events", "D.C. Events", "Login", "CreateAccount"];

// 	const navigation = useNavigation();

// 	const routes = [
// 		{ name: "MarylandEvents", params: { name: "MarylandEvents" } },
// 		{ name: "DCEvents", params: { name: "DCEvents" } },
// 		{ name: "Login", params: { name: "Login" } },
// 		{ name: "CreateAccount", params: { name: "CreateAccount" } },
// 	];

// 	const styles = StyleSheet.create({
// 		wrapper: {
// 			marginTop: "100px",
// 			paddingTop: 8,
// 			background: "blue",
// 		},
// 		fonts: {
// 			marginBottom: 8,
// 		},
// 		user: {
// 			flexDirection: "column",
// 			marginBottom: 6,
// 			minWidth: "100%",
// 			width: "100%",
// 		},
// 		image: {
// 			width: 258,
// 			height: 82,
// 			margin: 30,
// 			alignSelf: "center",
// 		},
// 		title: {
// 			fontWeight: "bold",
// 			marginBottom: 10,
// 		},
// 		date: {
// 			marginBottom: 10,
// 		},
// 	});

// 	const events = [
// 		{
// 			name: "Earthsave Presents Monthly Potluck",
// 			city: "Baltimore",
// 			date: "10/30/24",
// 			time: "6:00",
// 			url: "https://www.facebook.com/events/537953398951385",
// 		},
// 		{
// 			name: "Social Happy Hour",
// 			city: "Baltimore",
// 			date: "10/30/24",
// 			time: "6:00",
// 			url: "https://www.facebook.com/events/914804310016943",
// 		},
// 	];

// 	const OpenURLButton = ({ url, children }) => {
// 		const handlePress = useCallback(async () => {
// 			const supported = await Linking.canOpenURL(url);

// 			if (supported) {
// 				await Linking.openURL(url);
// 			} else {
// 				Alert.alert(`Don't know how to open this URL: ${url}`);
// 			}
// 		}, [url]);

// 		return (
// 			<Button
// 				buttonStyle={{ backgroundColor: "#288528" }}
// 				title={children}
// 				onPress={handlePress}
// 			/>
// 		);
// 	};

// 	return (
// 		<View style={styles.wrapper}>
// 			<Image
// 				style={styles.image}
// 				resizeMode="cover"
// 				source={require("../assets/images/logo.png")}
// 			/>

// 			<ButtonGroup
// 				buttons={options}
// 				selectedIndex={selectedIndex}
// 				onPress={(value) => {
// 					setSelectedIndex(value);
// 					const { name, params } = routes[value];
// 					navigation.navigate(name, params);
// 				}}
// 				containerStyle={{
// 					marginBottom: 20,
// 				}}
// 				buttonStyle={{ backgroundColor: "#288528" }}
// 				textStyle={{ color: "#fff" }}
// 				selectedButtonStyle={{ backgroundColor: "#B0B9B0" }}
// 				selectedTextStyle={{ color: "#fff" }}
// 			/>
// 			{events.map((u, i) => {
// 				return (
// 					<>
// 						<Card key={i} style={{ display: "flex", flexDirection: "column" }}>
// 							<View key={i} style={styles.user}>
// 								<Text style={styles.title}>{u.name}</Text>
// 								<Text style={styles.title}>{u.city}</Text>
// 								<Text style={styles.date}>{u.date}</Text>
// 								<Text style={styles.title}>{u.time}</Text>
// 								<OpenURLButton url={u.url}>Learn More </OpenURLButton>
// 							</View>
// 						</Card>
// 					</>
// 				);
// 			})}
// 		</View>
// 	);
// }
