import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import { twColors } from "@/constants/Colors";
import { journeysTable } from "@/db/schema";
import { deleteJourney, getAllJourneys } from "@/features/journeys/db";
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

// TODO: Styling
// List items
// No list items
// Loading state
// Error state
// Modal

export default function JourneysListContainer() {
    const sqliteContext = useSQLiteContext();
    const journeys = getAllJourneys(sqliteContext);

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
            <JourneysList dataPromise={journeys} />
        </Suspense>
    );
}

interface JourneysPageProps {
    dataPromise: Promise<(typeof journeysTable.$inferSelect)[]>;
}

function JourneysList({ dataPromise }: JourneysPageProps) {
    const journeys = use(dataPromise);

    return (
        <FlatList
            className="w-full"
            contentContainerClassName="gap-4"
            data={journeys}
            renderItem={({ item }) => <JourneyItem {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <View>
                    <Text>No journeys saved</Text>
                </View>
            }
        />
    );
}

function JourneyItem({
    id,
    distanceInMiles,
    mpg,
    price,
    createdAt,
    splitBetween,
}: typeof journeysTable.$inferSelect) {
    const sqliteContext = useSQLiteContext();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = useCallback(() => {
        deleteJourney(sqliteContext, id);
    }, [id]);

    return (
        <>
            <Modal open={modalVisible} setOpen={setModalVisible}>
                <View className="flex-1 flex-row gap-4 rounded shadow bg-slate-900 p-4 w-full items-start justify-start">
                    <View className="flex-1 flex-col gap-2 flex-grow w-full">
                        <Text className="text-white font-bold text-2xl">
                            {price}
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
                    <Text>Form will go here</Text>
                    {/* <JourneysForm fuelPrice={{ id, name, price }} /> */}
                </ModalContent>
            </Modal>
        </>
    );
}
