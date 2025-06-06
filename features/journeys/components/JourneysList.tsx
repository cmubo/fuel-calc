import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import {
    GroteskTextMedium,
    GroteskTextSemiBold,
} from "@/components/StyledText";
import { twColors } from "@/constants/Colors";
import { GLOBAL_BOTTOM_PADDING, GLOBAL_TOP_PADDING } from "@/constants/layout";
import reusableStyles from "@/constants/reusable-styles";
import { journeysTable } from "@/db/schema";
import { deleteJourney, getAllJourneys } from "@/features/journeys/db";
import { DecimalPrecision2 } from "@/helpers/math";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function JourneysList() {
    const sqliteContext = useSQLiteContext();
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const insets = useSafeAreaInsets();

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);

            queryClient.invalidateQueries({
                queryKey: ["journeys"],
            });
        }, 1000);
    }, []);

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
            contentContainerClassName="gap-4 w-full px-6 bg-slate-900"
            contentContainerStyle={{
                paddingBottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                paddingTop: insets.top + GLOBAL_TOP_PADDING,
            }}
            data={journeys}
            renderItem={({ item }) => <JourneyItem {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <View className="items-center py-8 gap-12 h-full">
                    <GroteskTextSemiBold className="text-center text-white text-2xl">
                        No journeys saved
                    </GroteskTextSemiBold>
                    <Link
                        href="/(tabs)"
                        className={reusableStyles.btnOutlineSky}
                    >
                        <GroteskTextSemiBold
                            className="font-medium text-lg"
                            style={{ color: twColors.sky["200"] }}
                        >
                            Create new journey?
                        </GroteskTextSemiBold>
                    </Link>
                </View>
            }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={twColors.sky["500"]}
                />
            }
        />
    );
}

function JourneyItem({
    id,
    title,
    distanceInMiles,
    mpg,
    price,
    createdAt,
    splitBetween,
    pricePerLitre,
}: typeof journeysTable.$inferSelect) {
    const queryClient = useQueryClient();
    const sqliteContext = useSQLiteContext();

    const mutation = useMutation({
        mutationFn: deleteJourney.bind(null, sqliteContext, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["journeys"],
            });
        },
    });

    return (
        <View className="flex-1 flex-row gap-4 rounded-md bg-slate-950 p-4 w-full items-start justify-start shadow-lg">
            <View className="flex-1 flex-col gap-2 flex-grow w-full">
                <GroteskTextMedium className="text-white font-bold text-2xl">
                    £{price}
                </GroteskTextMedium>

                {splitBetween > 1 ? (
                    <GroteskTextMedium className="text-slate-400">
                        {splitBetween} people, cost: £
                        {DecimalPrecision2.round(price / splitBetween, 2)}
                    </GroteskTextMedium>
                ) : null}

                <GroteskTextMedium className="text-slate-400">
                    Title: {title}
                </GroteskTextMedium>

                <GroteskTextMedium className="text-slate-400">
                    {distanceInMiles} miles travelled
                </GroteskTextMedium>

                <GroteskTextMedium className="text-slate-400">
                    {mpg} MPG
                </GroteskTextMedium>

                <GroteskTextMedium className="text-slate-400">
                    {pricePerLitre}p per litre
                </GroteskTextMedium>

                <GroteskTextMedium className="text-slate-400">
                    Date recorded: {new Date(createdAt).toLocaleDateString()}
                </GroteskTextMedium>
            </View>

            <View className="flex-none flex-row items-center justify-start gap-4 flex-shrink-0">
                <Link href={`/(modals)/editJourney/${id}`} asChild>
                    <Pressable>
                        <FontAwesome
                            size={24}
                            name="edit"
                            color={twColors.slate["300"]}
                        />
                    </Pressable>
                </Link>

                <TouchableOpacity onPress={() => mutation.mutate()}>
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
