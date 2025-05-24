import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import { MODAL_BOTTOM_PADDING, MODAL_TOP_PADDING } from "@/constants/layout";
import JourneyForm from "@/features/journeys/components/JourneyForm";
import { getJourney } from "@/features/journeys/db";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function editJourneyFormModal() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const sqliteContext = useSQLiteContext();
    const insets = useSafeAreaInsets();

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
        <ScrollView
            contentContainerClassName="px-6 bg-slate-900"
            contentContainerStyle={{
                paddingBottom: insets.bottom + MODAL_BOTTOM_PADDING,
                paddingTop: insets.top + MODAL_TOP_PADDING,
            }}
            showsVerticalScrollIndicator={false}
        >
            <JourneyForm
                journey={{
                    ...journey[0],
                }}
                onSuccessfulSubmitCallback={() => {
                    router.back();
                }}
            />
        </ScrollView>
    );
}
