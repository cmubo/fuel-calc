import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function SettingsPage() {
    return (
        <View>
            <Text>Settings</Text>

            <ScrollView>
                <Link href="/settings/fuel-prices">Fuel Prices</Link>
            </ScrollView>
        </View>
    );
}
