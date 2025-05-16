import JourneysList from "@/features/journeys/components/JourneysList";
import { SafeAreaView, View } from "react-native";

export default function JourneysScreen() {
    return (
        <SafeAreaView className="flex-1 bg-slate-950 relative">
            <View className="flex-1 items-center justify-center w-full h-full p-4">
                <JourneysList />
            </View>
        </SafeAreaView>
    );
}
