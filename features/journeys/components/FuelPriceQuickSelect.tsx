import { modalContext } from "@/components/Modal";
import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { getAllFuelPrices } from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function FuelPriceQuickSelect({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    const sqliteContext = useSQLiteContext();
    const { setOpen } = useContext(modalContext);

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
