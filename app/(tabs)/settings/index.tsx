import { GLOBAL_BOTTOM_PADDING, GLOBAL_TOP_PADDING } from "@/constants/layout";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="bg-slate-950 w-full flex-1 px-6"
            style={{ paddingTop: insets.top + GLOBAL_TOP_PADDING }}
        >
            <Text className="text-white text-2xl font-bold pb-8">Settings</Text>

            <ScrollView
                contentContainerClassName="gap-4"
                contentContainerStyle={{
                    paddingBottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                }}
            >
                <Link href="/settings/fuel-prices" asChild>
                    <TouchableOpacity className="w-full bg-slate-900 rounded-lg shadow p-4">
                        <Text className="text-left text-white text-lg font-bold">
                            Fuel Prices
                        </Text>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </View>
    );
}
