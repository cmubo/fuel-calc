import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { MODAL_BOTTOM_PADDING, MODAL_TOP_PADDING } from "@/constants/layout";
import FuelPricesForm from "@/features/fuel-prices/components/FuelPricesForm";
import { getFuelPrice } from "@/features/fuel-prices/db";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function editFuelPriceFormModal() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const sqliteContext = useSQLiteContext();
    const insets = useSafeAreaInsets();

    const {
        data: fuelPrice,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["fuel-prices", id],
        queryFn: getFuelPrice.bind(null, sqliteContext, id as string),
    });

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
    }

    return (
        <ScrollView
            contentContainerClassName="px-6 bg-slate-900"
            contentContainerStyle={{
                paddingBottom: insets.bottom + MODAL_BOTTOM_PADDING,
                paddingTop: insets.top + MODAL_TOP_PADDING,
            }}
            showsVerticalScrollIndicator={false}
        >
            <FuelPricesForm
                fuelPrice={{
                    ...fuelPrice[0],
                }}
                onSuccessfulSubmitCallback={() => {
                    router.back();
                }}
            />
        </ScrollView>
    );
}
