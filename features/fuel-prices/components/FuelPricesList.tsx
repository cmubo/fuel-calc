import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { twColors } from "@/constants/Colors";
import { fuelPricesTable } from "@/db/schema";
import {
    deleteFuelPrice,
    getAllFuelPrices,
    setDefaultFuelPrice,
} from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FuelPricesForm from "./FuelPricesForm";

export default function FuelPricesList() {
    const sqliteContext = useSQLiteContext();
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();

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
            className="w-full"
            contentContainerClassName="gap-4"
            data={fuelPrices}
            renderItem={({ item }) => <FuelPriceItem {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <View>
                    <Text>No fuel prices saved</Text>
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
    const [modalVisible, setModalVisible] = useState(false);

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
        <>
            <Modal open={modalVisible} setOpen={setModalVisible}>
                <View className="flex-1 flex-row gap-4 rounded shadow bg-slate-900 p-4 w-full items-start justify-start">
                    <View className="flex-1 flex-col gap-2 flex-grow w-full">
                        <Text className="text-slate-200">{name}</Text>
                        <Text className="text-white font-bold text-2xl">
                            {priceMemoised}
                        </Text>
                    </View>

                    <View className="flex-none flex-row items-center justify-start gap-4 flex-shrink-0">
                        <ModalTrigger asChild>
                            <Pressable>
                                <FontAwesome
                                    size={24}
                                    name="edit"
                                    color={twColors.slate["300"]}
                                />
                            </Pressable>
                        </ModalTrigger>

                        {isDefault ? (
                            <FontAwesome
                                size={24}
                                name="star"
                                color={twColors.yellow["400"]}
                            />
                        ) : (
                            <TouchableOpacity
                                onPress={() => handleSetDefault()}
                            >
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

                <ModalContent>
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: 24,
                        }}
                    >
                        <FuelPricesForm fuelPrice={{ id, name, price }} />
                    </ScrollView>
                </ModalContent>
            </Modal>
        </>
    );
}
