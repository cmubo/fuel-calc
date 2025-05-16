import JourneyForm from "@/features/journeys/components/JourneyForm";
import { SafeAreaView, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalculatorScreen() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView className="bg-slate-950">
            <ScrollView
                contentContainerClassName="px-4"
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: insets.bottom + 80,
                    paddingTop: insets.top + 24,
                }}
                showsVerticalScrollIndicator={false}
            >
                <JourneyForm />
            </ScrollView>
        </SafeAreaView>
    );
}
