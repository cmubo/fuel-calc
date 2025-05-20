import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { getDefaultFuelPrice } from "@/features/fuel-prices/db";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView, ScrollView } from "react-native";
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

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
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
