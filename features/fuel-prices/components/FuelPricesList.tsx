import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import { twColors } from "@/constants/Colors";
import { fuelPricesTable } from "@/db/schema";
import {
    deleteFuelPrice,
    getAllFuelPrices,
    setDefaultFuelPrice,
} from "@/features/fuel-prices/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use, useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FuelPricesForm from "./FuelPricesForm";

// TODO: Styling
// List items
// No list items
// Loading state
// Error state
// Modal

export default function FuelPricesListContainer() {
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
            <FuelPricesList dataPromise={fuelPrices} />
        </Suspense>
    );
}

interface FuelPricesPageProps {
    dataPromise: Promise<(typeof fuelPricesTable.$inferSelect)[]>;
}

function FuelPricesList({ dataPromise }: FuelPricesPageProps) {
    const fuelPrices = use(dataPromise);

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
        />
    );
}

function FuelPriceItem({
    id,
    name,
    price,
    updatedAt,
    isDefault,
}: typeof fuelPricesTable.$inferSelect) {
    const sqliteContext = useSQLiteContext();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSetDefault = useCallback(() => {
        setDefaultFuelPrice(sqliteContext, id);
    }, [id]);

    const handleDelete = useCallback(() => {
        deleteFuelPrice(sqliteContext, id);
    }, [id]);

    return (
        <>
            <Modal open={modalVisible} setOpen={setModalVisible}>
                <View className="flex-1 flex-row gap-4 rounded shadow bg-slate-900 p-4 w-full items-start justify-start">
                    <View className="flex-1 flex-col gap-2 flex-grow w-full">
                        <Text className="text-slate-200">{name}</Text>
                        <Text className="text-white font-bold text-2xl">
                            {price}
                        </Text>
                        <Text className="text-slate-400">{updatedAt}</Text>
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
                            <TouchableOpacity onPress={handleSetDefault}>
                                <FontAwesome
                                    size={24}
                                    name="star-o"
                                    color={twColors.yellow["400"]}
                                />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={handleDelete}>
                            <FontAwesome
                                size={24}
                                name="trash"
                                color={twColors.red["600"]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ModalContent>
                    <FuelPricesForm fuelPrice={{ id, name, price }} />
                </ModalContent>
            </Modal>
        </>
    );
}
