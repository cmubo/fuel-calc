import { fuelPricesTable } from "@/db/schema";
import {
    deleteFuelPrice,
    getAllFuelPrices,
    setDefaultFuelPrice,
} from "@/features/fuel-prices/db";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use, useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
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
    dataPromise: Promise<
        {
            id: number;
            name: string;
            price: number;
            createdAt: string;
            updatedAt: string;
            isDefault: number;
        }[]
    >;
}

function FuelPricesList({ dataPromise }: FuelPricesPageProps) {
    const fuelPrices = use(dataPromise);

    return (
        <FlatList
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex-1 items-center justify-center mx-6">
                    <View
                        style={styles.modalView}
                        className="m-5 bg-white rounded-2xl p-6 items-center w-full"
                    >
                        <FuelPricesForm fuelPrice={{ id, name, price }} />
                        <Text className="mb-4 text-center">Hello World!</Text>
                        <Pressable
                            className="rounded-2xl p-3"
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text className="text-white font-bold text-center">
                                Hide Modal
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                className="rounded-2xl p-3"
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white font-bold text-center">
                    Show Modal
                </Text>
            </Pressable>
            <View className="flex flex-row gap-4">
                <Text>{name}</Text>
                <Text>{price}</Text>
                <Text>{updatedAt}</Text>
                <Text>{isDefault ? "Is default" : "Not default"}</Text>
                <Button onPress={handleSetDefault} title="Set as default" />
                <Button onPress={handleDelete} title="Delete" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    modalView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});
