import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { getAllFuelPrices } from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetFlatList, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Text, TouchableOpacity, View } from "react-native";

export default function FuelPriceQuickSelect({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    const sqliteContext = useSQLiteContext();
    const { dismiss } = useBottomSheetModal();

    const {
        data: fuelPrices,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["fuelPrices"],
        queryFn: getAllFuelPrices.bind(null, sqliteContext),
    });

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
    }

    return (
        <BottomSheetFlatList
            className="w-full"
            contentContainerClassName="gap-4 px-4 pb-4"
            data={fuelPrices}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="bg-cyan-500 rounded-lg p-3 px-8"
                    onPress={() => {
                        onFuelPriceSelect(item.price);
                        dismiss();
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
