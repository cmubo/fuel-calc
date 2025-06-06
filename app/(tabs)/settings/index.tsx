import { GroteskTextBold, GroteskTextMedium } from "@/components/StyledText";
import { GLOBAL_BOTTOM_PADDING, GLOBAL_TOP_PADDING } from "@/constants/layout";
import { Link } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="bg-slate-900 w-full flex-1 px-6"
            style={{ paddingTop: insets.top + GLOBAL_TOP_PADDING }}
        >
            <GroteskTextBold className="text-white text-2xl pb-8">
                Settings
            </GroteskTextBold>

            <ScrollView
                contentContainerClassName="gap-4"
                contentContainerStyle={{
                    paddingBottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                }}
            >
                <Link href="/settings/fuel-prices" asChild>
                    <TouchableOpacity className="w-full bg-slate-950 rounded-lg shadow-md p-4">
                        <GroteskTextMedium className="text-left text-white text-lg">
                            Fuel Prices
                        </GroteskTextMedium>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </View>
    );
}
