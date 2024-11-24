import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

const CustomDefaultTheme = {
	dark: false,
	colors: {
		primary: "blue",
		background: "white",
		card: "white",
		text: "black",
		border: "gray",
		notification: "red",
	},
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				theme:
					colorScheme === "light" ? CustomDefaultTheme : CustomDefaultTheme,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="not-found" />
		</Stack>
	);
}
