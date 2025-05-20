import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { twColors } from "@/constants/Colors";
import { journeysTable } from "@/db/schema";
import { deleteJourney, getAllJourneys } from "@/features/journeys/db";
import { DecimalPrecision2 } from "@/helpers/math";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import JourneyForm from "./JourneyForm";

export default function JourneysList() {
    const sqliteContext = useSQLiteContext();

    const {
        data: journeys,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["journeys"],
        queryFn: getAllJourneys.bind(null, sqliteContext),
    });

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
    }

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
    const queryClient = useQueryClient();
    const sqliteContext = useSQLiteContext();
    const [modalVisible, setModalVisible] = useState(false);

    const mutation = useMutation({
        mutationFn: deleteJourney.bind(null, sqliteContext, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["journeys"],
            });
        },
    });

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

                        <TouchableOpacity onPress={() => mutation.mutate()}>
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
                            alignItems: "center",
                            paddingHorizontal: 24,
                            paddingBottom: 24,
                        }}
                    >
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
                    </ScrollView>
                </ModalContent>
            </Modal>
        </>
    );
}
