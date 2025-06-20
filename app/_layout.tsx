import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

import "./global.css";

import Providers from "@/components/providers/Providers";
import { twColors } from "@/constants/Colors";
import { SystemBars } from "react-native-edge-to-edge";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Set the app background colour
SystemUI.setBackgroundColorAsync("#0f172a");

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        SpaceGrotesk: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
        "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
        "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
        "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <>
            <SystemBars style="light" />

            <Providers>
                <Stack
                    screenOptions={{
                        contentStyle: { backgroundColor: twColors.slate[900] },
                    }}
                >
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(modals)"
                        options={{ presentation: "modal", headerShown: false }}
                    />
                </Stack>
            </Providers>
        </>
    );
}
