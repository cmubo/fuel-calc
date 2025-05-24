import { MODAL_BOTTOM_PADDING, MODAL_TOP_PADDING } from "@/constants/layout";
import FuelPricesForm from "@/features/fuel-prices/components/FuelPricesForm";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function newFuelPriceFormModal() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

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
                onSuccessfulSubmitCallback={() => {
                    router.back();
                }}
            />
        </ScrollView>
    );
}
