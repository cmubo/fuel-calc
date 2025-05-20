import { fuelPricesTable } from "@/db/schema";
import { getDefaultFuelPrice } from "@/features/fuel-prices/db";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalculatorScreenWrapper() {
    const sqliteContext = useSQLiteContext();
    const defaultFuelPricePromise = getDefaultFuelPrice(sqliteContext);

    return (
        <SafeAreaView className="bg-slate-950">
            <Suspense
                fallback={
                    <View className="flex items-center justify-center w-full h-full flex-col">
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            className="my-3"
                        />
                    </View>
                }
            >
                <CalculatorScreen
                    defaultFuelPricePromise={defaultFuelPricePromise}
                />
            </Suspense>
        </SafeAreaView>
    );
}

interface CalculatorScreenProps {
    defaultFuelPricePromise: Promise<(typeof fuelPricesTable.$inferSelect)[]>;
}

function CalculatorScreen({ defaultFuelPricePromise }: CalculatorScreenProps) {
    const insets = useSafeAreaInsets();
    const defaultFuelPrice = use(defaultFuelPricePromise);

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
