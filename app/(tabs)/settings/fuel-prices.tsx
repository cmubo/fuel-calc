import FuelPricesFloatingButton from "@/features/fuel-prices/components/FuelPricesFloatingButton";
import FuelPricesList from "@/features/fuel-prices/components/FuelPricesList";
import { View } from "react-native";

export default function FuelPricesPage() {
    return (
        <View className="flex-1 bg-slate-950 shadow-md relative">
            <FuelPricesList />
            <FuelPricesFloatingButton />
        </View>
    );
}
