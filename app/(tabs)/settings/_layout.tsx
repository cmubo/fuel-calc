import { twColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function SettingsRootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: twColors.slate[900],
                },
                headerTintColor: twColors.white,
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "Settings" }}
            />
            <Stack.Screen
                name="fuel-prices"
                options={{ title: "Fuel Prices" }}
            />
        </Stack>
    );
}
