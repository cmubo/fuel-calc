import { Link } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsPage() {
    return (
        <SafeAreaView className="bg-slate-950 w-full flex-1">
            <View className=" p-4 w-full flex-1">
                <Text className="text-white text-2xl font-bold pb-8">
                    Settings
                </Text>

                <ScrollView>
                    <Link href="/settings/fuel-prices" asChild>
                        <TouchableOpacity className="w-full bg-slate-900 rounded-lg shadow p-4">
                            <Text className="text-left text-white text-lg font-bold">
                                Fuel Prices
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
