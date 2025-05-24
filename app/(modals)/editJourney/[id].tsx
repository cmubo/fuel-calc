import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { getJourney } from "@/features/journeys/db";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View } from "react-native";

export default function editJourneyFormModal() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const sqliteContext = useSQLiteContext();

    const {
        data: journey,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["journeys", id],
        queryFn: getJourney.bind(null, sqliteContext, id as string),
    });

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
    }

    return (
        <View className="flex-1 h-full p-4">
            <JourneyForm
                journey={{
                    ...journey[0],
                }}
                onSuccessfulSubmitCallback={() => {
                    router.back();
                }}
            />
        </View>
    );
}
