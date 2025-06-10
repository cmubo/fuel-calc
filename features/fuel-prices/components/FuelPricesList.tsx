import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { GroteskTextBold, GroteskTextMedium } from "@/components/StyledText";
import { twColors } from "@/constants/Colors";
import { GLOBAL_BOTTOM_PADDING, GLOBAL_TOP_PADDING } from "@/constants/layout";
import { fuelPricesTable } from "@/db/schema";
import {
    deleteFuelPrice,
    getAllFuelPrices,
    setDefaultFuelPrice,
} from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FuelPricesList() {
    const sqliteContext = useSQLiteContext();
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const insets = useSafeAreaInsets();

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);

            queryClient.invalidateQueries({
                queryKey: ["fuelPrices"],
            });
        }, 1000);
    }, []);

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
            contentContainerClassName="gap-4 px-4"
            contentContainerStyle={{
                paddingBottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                paddingTop: insets.top + GLOBAL_TOP_PADDING,
            }}
            data={fuelPrices}
            renderItem={({ item }) => <FuelPriceItem {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <View>
                    <GroteskTextMedium className="text-white text-center text-lg">
                        No fuel prices saved
                    </GroteskTextMedium>
                </View>
            }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={twColors.blue["500"]}
                />
            }
        />
    );
}

function FuelPriceItem({
    id,
    name,
    price,
    isDefault,
}: typeof fuelPricesTable.$inferSelect) {
    const queryClient = useQueryClient();
    const sqliteContext = useSQLiteContext();

    const priceMemoised = useMemo(() => {
        return price.toFixed(2);
    }, [price]);

    const { mutate: handleSetDefault } = useMutation({
        mutationFn: setDefaultFuelPrice.bind(null, sqliteContext, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fuelPrices"],
            });
        },
    });

    const { mutate: handleDelete } = useMutation({
        mutationFn: deleteFuelPrice.bind(null, sqliteContext, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["fuelPrices"],
            });
        },
    });

    return (
        <View className="flex-1 flex-row gap-4 rounded shadow bg-slate-950 p-4 w-full items-start justify-start">
            <View className="flex-1 flex-col gap-2 flex-grow w-full">
                <GroteskTextMedium className="text-slate-200">
                    {name}
                </GroteskTextMedium>
                <GroteskTextBold className="text-white text-2xl">
                    {priceMemoised}
                </GroteskTextBold>
            </View>

            <View className="flex-none flex-row items-center justify-start gap-4 flex-shrink-0">
                <Link href={`/(modals)/editFuelPrice/${id}`} asChild>
                    <Pressable>
                        <FontAwesome
                            size={24}
                            name="edit"
                            color={twColors.slate["300"]}
                        />
                    </Pressable>
                </Link>

                {isDefault ? (
                    <FontAwesome
                        size={24}
                        name="star"
                        color={twColors.yellow["400"]}
                    />
                ) : (
                    <TouchableOpacity onPress={() => handleSetDefault()}>
                        <FontAwesome
                            size={24}
                            name="star-o"
                            color={twColors.yellow["400"]}
                        />
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => handleDelete()}>
                    <FontAwesome
                        size={24}
                        name="trash"
                        color={twColors.red["600"]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
