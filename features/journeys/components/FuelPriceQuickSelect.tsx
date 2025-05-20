import { modalContext } from "@/components/Modal";
import { fuelPricesTable } from "@/db/schema";
import { getAllFuelPrices } from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use, useContext } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FuelPriceQuickSelect({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    const sqliteContext = useSQLiteContext();
    const fuelPrices = getAllFuelPrices(sqliteContext);

    return (
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
            <FuelPriceList
                dataPromise={fuelPrices}
                onFuelPriceSelect={onFuelPriceSelect}
            />
        </Suspense>
    );
}

function FuelPriceList({
    onFuelPriceSelect,
    dataPromise,
}: {
    onFuelPriceSelect: (price: number) => void;
    dataPromise: Promise<(typeof fuelPricesTable.$inferSelect)[]>;
}) {
    const fuelPrices = use(dataPromise);
    const { setOpen } = useContext(modalContext);

    return (
        <FlatList
            className="w-full"
            contentContainerClassName="gap-4 px-4 pb-4"
            data={fuelPrices}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="bg-cyan-500 rounded-lg p-3 px-8"
                    onPress={() => {
                        onFuelPriceSelect(item.price);
                        setOpen(false);
                    }}
                >
                    <View className="flex-row justify-between items-center gap-4">
                        <Text className="text-white text-center font-bold text-lg ">
                            {String(item.price)}
                        </Text>
                        <FontAwesome
                            name="chevron-right"
                            size={16}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <View>
                    <Text>No fuel prices saved</Text>
                </View>
            }
        />
    );
}
