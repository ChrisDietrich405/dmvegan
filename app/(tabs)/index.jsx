// For adding Apple SSO in IOS I'm trying to run the app using EAS, but running the command eas build --platform ios
// I get an error eas.json is not valid.
//- "build.ios.production" is not allowed
//- "build.android.production" is not allowed

// For adding Google SSO in Android I'm trying to use Android Studio, but the Google button won't show up
// you can't run Google SSO only in expo. I'm supposed to run npx expo prebuild --clean then npx expo run:ios
// then I get the same error as above

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

// To start the Android emulator
// cd ~/Android/Sdk/emulator
// ./emulator -avd Medium_Phone_API_35
//npm run android - it builds a new apk file and also updates any changes I made and then runs the app in the emulator
//https://console.cloud.google.com/welcome?_gl=1*9p20w8*_up*MQ..&gclid=CjwKCAiA9bq6BhAKEiwAH6bqoAO6rAOOXBEcSKgKi4KUCXwwI5eQjANCTicRj5KDnauuo-tCfV1kShoCCmoQAvD_BwE&inv=1&invt=AbjLAg&project=dmvegans-443020

// gradle
// Copy code
// apply plugin: 'com.google.gms.google-services'
// 5. Rebuild the Application
// Once everything is set up, rebuild your app to ensure the native binary is updated with the new configuration.

// bash
// Copy code
// npm run android

import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon, CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";

import {
	WEB_CLIENT_ID,
	IOS_CLIENT_ID,
	ANDROID_CLIENT_ID,
} from "../keys/index.js";

GoogleSignin.configure({
	webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
	scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
	iosClientId: IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	// androidClientId: ANDROID_CLIENT_ID,
});

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureText, setSecureText] = useState(true);

	const navigation = useNavigation();

	const handleLogin = async () => {
		// setIsLoading(true);

		// User data to send in the request body
		const userData = {
			email,
			password,
		};

		try {
			// Make the API request to authenticate the user
			const response = await fetch("http://192.168.1.163:3001/v1/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});
			console.log("RESPONSE", response);

			// Parse the response JSON
			const data = await response.json();

			// Check if the login was successful
			if (response.ok) {
				alert("hello");
				// If successful, navigate to the Home screen
				navigation.navigate("home");
			} else {
				// If failed, show an error message
				// Alert.alert(
				// 	"Login Failed",
				// 	data.message || "Invalid email or password."
				// );
				alert("login failed");
			}
		} catch (error) {
			// Handle network or other errors
			// Alert.alert("Error", "Something went wrong. Please try again later.");
			alert("bad");
		}

		// setIsLoading(false);
	};

	// import statusCodes along with GoogleSignin

	// Somewhere in your code
	const signIn = async () => {
		// try {
		//   await GoogleSignin.hasPlayServices();
		const response = await GoogleSignin.signIn();
		console.log("SHOE", response);
		//   if (isSuccessResponse(response)) {
		// 	setState({ userInfo: response.data });
		//   } else {
		// sign in was cancelled by user
		//   }
		// } catch (error) {
		//   if (isErrorWithCode(error)) {
		// 	switch (error.code) {
		// 	  case statusCodes.IN_PROGRESS:
		// 		// operation (eg. sign in) already in progress
		// 		break;
		// 	  case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
		// 		// Android only, play services not available or outdated
		// 		break;
		// 	  default:
		// 	  // some other error happened
		// 	}
		//   } else {
		// 	// an error that's not related to google sign in occurred
		//   }
		// }
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			padding: 20,
			alignItems: "center",
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
			margin: 20,
			fontSize: 12,
			borderRadius: 24,
			width: 300,
			display: "flex",
			justifyContent: "center",
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
			{/* <Icon name="google" size={30} color="#000" /> */}
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn()}
			/>
			<Text>shoe</Text>

			<Button
				title="Baltimore"
				onPress={handleLogin}
				buttonStyle={styles.button}
				titleStyle={{ fontSize: 16 }}
				icon={
					<Icon
						name="arrow-down"
						type="font-awesome"
						size={14} // Adjust size as needed
						color="white" // Set the icon color to white
						iconContainerStyle={{ marginRight: 29 }}
					/>
				}
				iconPosition="left" // Position the icon to the right of the title
				// Add margin to the left of the icon (adjust as needed)
			/>

			<Text style={styles.loginSubText}>
				An app to notify you of local vegan catering/popup events
			</Text>
			<Text style={styles.loginSubText}>
				An app to notify you of local vegan catering/popup events
			</Text>

			{/* <Input
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
			/> */}
			{/* <TouchableOpacity>
				<Text
					onPress={() => navigation.navigate("recover-password")}
					style={styles.forgotPasswordText}
				>
					Forgot Password
				</Text>
			</TouchableOpacity> */}
			{/* <View style={styles.checkboxContainer}>
				<CheckBox
					checked={false}
					disabled
					iconType="material-community"
					checkedIcon="checkbox-outline"
					uncheckedIcon="checkbox-blank-outline"
				/>
				<Text style={styles.text}>Remember password</Text>
			</View> */}

			<Button
				titleStyle={{ fontSize: 16 }}
				title="Sign in with your Google shoe account"
				onPress={handleLogin}
				buttonStyle={styles.button}
			/>

			<Button
				titleStyle={{ fontSize: 16 }}
				title="Sign in with your Apple account"
				onPress={() => navigation.navigate("events")}
				buttonStyle={styles.button}
			/>
			<Button
				titleStyle={{ fontSize: 16 }}
				title="Create account"
				onPress={() => navigation.navigate("create-account")}
				buttonStyle={styles.button}
			/>
			<Button
				titleStyle={{ fontSize: 16 }}
				title="Add event"
				onPress={() => navigation.navigate("add-event")}
				buttonStyle={styles.button}
			/>
		</View>
	);
}

// import React, { useState } from "react";
// import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
// import { Input, Button, Icon, CheckBox } from "@rneui/themed";
// import { useNavigation } from "@react-navigation/native";

// export default function LoginScreen() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [secureText, setSecureText] = useState(true);

// 	const navigation = useNavigation();

// 	const handleLogin = async () => {
// 		// setIsLoading(true);

// 		// User data to send in the request body
// 		const userData = {
// 			email,
// 			password,
// 		};

// 		try {
// 			// Make the API request to authenticate the user
// 			const response = await fetch("http://192.168.1.163:3001/v1/api/auth", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(userData),
// 			});
// 			console.log("RESPONSE", response);

// 			// Parse the response JSON
// 			const data = await response.json();

// 			// Check if the login was successful
// 			if (response.ok) {
// 				alert("hello");
// 				// If successful, navigate to the Home screen
// 				navigation.navigate("home");
// 			} else {
// 				// If failed, show an error message
// 				// Alert.alert(
// 				// 	"Login Failed",
// 				// 	data.message || "Invalid email or password."
// 				// );
// 				alert("login failed");
// 			}
// 		} catch (error) {
// 			// Handle network or other errors
// 			// Alert.alert("Error", "Something went wrong. Please try again later.");
// 			alert("bad");
// 		}

// 		// setIsLoading(false);
// 	};

// 	const styles = StyleSheet.create({
// 		container: {
// 			flex: 1,
// 			justifyContent: "center",
// 			padding: 20,
// 		},
// 		image: {
// 			width: 258,
// 			height: 82,
// 			marginBottom: 20,
// 			alignSelf: "center",
// 			borderRadius: 8,
// 		},
// 		forgotPasswordText: {
// 			color: "#007bff",
// 			textAlign: "right",
// 			marginBottom: 20,
// 			textDecorationLine: "underline",
// 			fontSize: 14,
// 		},
// 		button: {
// 			backgroundColor: "#288528",
// 			color: "blue",
// 			marginTop: 10,
// 			fontSize: 12,
// 		},
// 		loginText: {
// 			fontSize: 16,
// 			fontWeight: "bold",
// 			textAlign: "center", // Optional: Align text to the center
// 			marginBottom: 60, // Optional: Add spacing below the text
// 		},
// 		loginSubText: {
// 			fontSize: 12,
// 			textAlign: "center", // Optional: Align text to the center
// 			marginBottom: 120, // Optional: Add spacing below the text
// 		},
// 		checkboxContainer: {
// 			flexDirection: "row",
// 			alignItems: "center",
// 		},
// 		text: {
// 			// Space between the checkbox and the text
// 			fontSize: 8,
// 		},
// 	});

// 	return (
// 		<View style={styles.container}>
// 			<Image
// 				style={styles.image}
// 				resizeMode="cover"
// 				source={require("../../assets/images/logo2.png")}
// 			/>
// 			<Text style={styles.loginText}>Login</Text>
// 			<Text style={styles.loginSubText}>
// 				Add your email and password in order to sign in
// 			</Text>

// 			<Input
// 				placeholder="Email"
// 				value={email}
// 				onChangeText={setEmail}
// 				autoCapitalize="none"
// 				keyboardType="email-address"
// 				inputStyle={{ fontSize: 12 }}
// 			/>
// 			<Input
// 				placeholder="Password"
// 				rightIcon={
// 					<Icon
// 						name={secureText ? "visibility-off" : "visibility"}
// 						onPress={() => setSecureText(!secureText)}
// 					/>
// 				}
// 				value={password}
// 				onChangeText={setPassword}
// 				secureTextEntry={secureText}
// 				inputStyle={{ fontSize: 12 }}
// 			/>
// 			<TouchableOpacity>
// 				<Text
// 					onPress={() => navigation.navigate("recover-password")}
// 					style={styles.forgotPasswordText}
// 				>
// 					Forgot Password
// 				</Text>
// 			</TouchableOpacity>
// 			<View style={styles.checkboxContainer}>
// 				<CheckBox
// 					checked={false}
// 					disabled
// 					iconType="material-community"
// 					checkedIcon="checkbox-outline"
// 					uncheckedIcon="checkbox-blank-outline"
// 				/>
// 				<Text style={styles.text}>Remember password</Text>
// 			</View>

// 			<Button
// 				titleStyle={{ fontSize: 16 }}
// 				title="Login"
// 				onPress={handleLogin}
// 				buttonStyle={styles.button}
// 			/>

// 			<Button
// 				titleStyle={{ fontSize: 16 }}
// 				title="Create Account"
// 				onPress={() => navigation.navigate("create-account")}
// 				buttonStyle={styles.button}
// 			/>
// 		</View>
// 	);
// }
