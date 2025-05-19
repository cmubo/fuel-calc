import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import { twColors } from "@/constants/Colors";
import { journeysTable } from "@/db/schema";
import { deleteJourney, getAllJourneys } from "@/features/journeys/db";
import { DecimalPrecision2 } from "@/helpers/math";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { Suspense, use, useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import JourneyForm from "./JourneyForm";

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
                <View className="items-center py-8">
                    <Text className="text-center text-white font-medium text-2xl">
                        No journeys saved
                    </Text>
                    <Link
                        href="/(tabs)"
                        className="text-blue-500 font-medium text-lg mt-8"
                    >
                        Create new journey
                    </Link>
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
    pricePerLitre,
}: typeof journeysTable.$inferSelect) {
    const sqliteContext = useSQLiteContext();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = useCallback(() => {
        deleteJourney(sqliteContext, id);
    }, [id]);

    return (
        <>
            <Modal open={modalVisible} setOpen={setModalVisible}>
                <View className="flex-1 flex-row gap-4 rounded-lg shadow bg-slate-900 p-4 w-full items-start justify-start">
                    <View className="flex-1 flex-col gap-2 flex-grow w-full">
                        <Text className="text-white font-bold text-2xl">
                            £{price}
                        </Text>
                        {splitBetween > 1 ? (
                            <Text className="text-slate-400">
                                Split between {splitBetween} people, cost: £
                                {DecimalPrecision2.round(
                                    price / splitBetween,
                                    2,
                                )}
                            </Text>
                        ) : null}

                        <Text className="text-slate-400">
                            Distance: {distanceInMiles} miles
                        </Text>
                        <Text className="text-slate-400">MPG: {mpg}</Text>
                        <Text className="text-slate-400">
                            Price per litre: {pricePerLitre}p
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
                    <JourneyForm
                        journey={{
                            id,
                            distanceInMiles,
                            mpg,
                            price,
                            createdAt,
                            splitBetween,
                            pricePerLitre,
                        }}
                        onSuccessfulSubmitCallback={() => {
                            setModalVisible(false);
                        }}
                    />
                </ModalContent>
            </Modal>
        </>
    );
}
