import { twColors } from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function ModalsLayout() {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
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
                    }}
                >
                    <Stack.Screen
                        name="editJourney/[id]"
                        options={{ title: "Edit Journey" }}
                    />
                    <Stack.Screen
                        name="newFuelPrice/index"
                        options={{
                            title: "New Fuel Price",
                        }}
                    />
                    <Stack.Screen
                        name="editFuelPrice/[id]"
                        options={{ title: "Edit Fuel Price" }}
                    />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
