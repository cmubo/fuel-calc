import { twColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function ModalsLayout() {
    return (
        <View className="flex-1 h-full w-full bg-slate-950">
            <Stack
                screenOptions={{
                    presentation: "modal",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: twColors.slate["900"],
                    },
                    headerTitleStyle: {
                        color: "#fff",
                    },
                    contentStyle: {
                        backgroundColor: twColors.slate["900"],
                    },
                    animation: "slide_from_bottom",
                }}
            >
                <Stack.Screen name="editJourney/[id]" />
            </Stack>
        </View>
    );
}
