import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { GroteskTextBold, GroteskTextMedium } from "@/components/StyledText";
import { getAllFuelPrices } from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

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
        <FlatList
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
                        <View>
                            <GroteskTextMedium className="text-white text-center">
                                {String(item.name)}
                            </GroteskTextMedium>
                            <GroteskTextBold className="text-white text-center text-lg ">
                                {String(item.price)}
                            </GroteskTextBold>
                        </View>
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
                    <GroteskTextMedium>No fuel prices saved</GroteskTextMedium>
                </View>
            }
        />
    );
}
