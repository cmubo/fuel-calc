import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { GLOBAL_BOTTOM_PADDING, GLOBAL_TOP_PADDING } from "@/constants/layout";
import { getDefaultFuelPrice } from "@/features/fuel-prices/db";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalculatorScreen() {
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
            contentContainerClassName="px-6 bg-slate-900"
            contentContainerStyle={{
                paddingBottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                paddingTop: insets.top + GLOBAL_TOP_PADDING,
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
