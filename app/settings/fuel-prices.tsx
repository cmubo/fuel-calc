import FuelPricesForm from "@/features/fuel-prices/components/FuelPricesForm";
import FuelPricesList from "@/features/fuel-prices/components/FuelPricesList";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FuelPricesPage() {
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center w-full h-full flex-col">
                <FuelPricesForm />
                <FuelPricesList />
            </View>
        </SafeAreaView>
    );
}
