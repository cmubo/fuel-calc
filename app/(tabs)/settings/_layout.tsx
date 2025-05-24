import { Stack } from "expo-router";

export default function SettingsRootLayout() {
    return (
        <Stack>
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
