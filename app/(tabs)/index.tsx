import { getDefaultFuelPrice } from "@/features/fuel-prices/db";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalculatorScreenWrapper() {
    return (
        <SafeAreaView className="bg-slate-950">
            <CalculatorScreen />
        </SafeAreaView>
    );
}

function CalculatorScreen() {
    const sqliteContext = useSQLiteContext();

    const insets = useSafeAreaInsets();

    const {
        data: defaultFuelPrice,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["defaultFuelPrice"],
        queryFn: getDefaultFuelPrice.bind(null, sqliteContext),
    });

    if (isPending) {
        return (
            <View className="flex items-center justify-center w-full h-full flex-col">
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="my-3"
                />
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex items-center justify-center w-full h-full flex-col">
                <Text>There was an error</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerClassName="px-4"
            contentContainerStyle={{
                minHeight: "100%",
                paddingBottom: insets.bottom + 80,
                paddingTop: insets.top + 24,
            }}
            showsVerticalScrollIndicator={false}
        >
            <JourneyForm
                defaultFuelPrice={
                    defaultFuelPrice ? defaultFuelPrice[0]?.price : null
                }
            />
        </ScrollView>
    );
}
