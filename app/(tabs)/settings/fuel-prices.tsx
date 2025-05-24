import FuelPricesFormModal from "@/features/fuel-prices/components/FuelPricesFormModal";
import FuelPricesList from "@/features/fuel-prices/components/FuelPricesList";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FuelPricesPage() {
    return (
        <SafeAreaView className="flex-1 bg-slate-950 relative">
            <View className="flex-1 items-center justify-center w-full h-full p-4">
                <FuelPricesList />
                <FuelPricesFormModal />
            </View>
        </SafeAreaView>
    );
}
