import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";

import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin";

import {
	WEB_CLIENT_ID,
	IOS_CLIENT_ID,
	// ANDROID_CLIENT_ID,
} from "../../keys/index.js";

GoogleSignin.configure({
	webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
	scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
	iosClientId: IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	// androidClientId: ANDROID_CLIENT_ID,
});

export default function SignInWithGoogle({ navigation }) {
	const [userInfo, setUserInfo] = useState(null);
	const [error, setError] = useState(null);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			borderRadius: 20,
		},
	});

	const signIn = async () => {
		console.log("Sign-in button clicked"); // Debug
		try {
			// Ensure Play Services are available (for Android)
			await GoogleSignin.hasPlayServices();

			// Trigger Google sign-in
			const response = await GoogleSignin.signIn();
			console.log("Response bogo:", response);

			// Save user information in state
			setUserInfo(response);
			setError(null);
		} catch (err) {
			console.error("Sign-in error:", err);
		}
		// 	if (err.code === statusCodes.IN_PROGRESS) {
		// 		setError("Sign-in is already in progress.");
		// 	} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
		// 		setError("Play Services are not available or outdated.");
		// 	} else {
		// 		setError("An unexpected error occurred.");
		// 	}
		// }
	};

	return (
		<View style={styles.container}>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
				style={{
					width: 250, // Customize the width
					height: 50, // Customize the height
					borderRadius: 50, // Add rounded corners
					backgroundColor: "#288528",
				}}
			/>
		</View>
	);
}
