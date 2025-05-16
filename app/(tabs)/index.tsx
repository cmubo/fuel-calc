import reusableStyles from "@/constants/reusable-styles";
import { calculatePriceOfFuel, priceOfFuelToCurrency } from "@/helpers/math";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function FuelCalculatorForm() {
    const [distance, setDistance] = useState("100");
    const [pricePerLitre, setPricePerLitre] = useState("127.5");
    const [mpg, setMpg] = useState("50");
    const [split, setSplit] = useState("1");
    const [cost, setCost] = useState("0");
    const [splitCost, setSplitCost] = useState("0");

    const handleDistanceChange = (text: string) => setDistance(text);
    const handlePricePerLitreChange = (text: string) => setPricePerLitre(text);
    const handleMpgChange = (text: string) => setMpg(text);
    const handleSplitChange = (text: string) => setSplit(text);

    useEffect(() => {
        if (!distance || !pricePerLitre || !mpg) {
            setCost("0.00");
            setSplitCost("0.00");
        } else {
            const cost = calculatePriceOfFuel(
                parseFloat(distance),
                parseFloat(pricePerLitre),
                parseFloat(mpg),
            );
            const costFormatted = priceOfFuelToCurrency(cost);
            setCost(costFormatted);

            if (!split || split === "0") {
                setSplitCost(costFormatted);
            } else {
                setSplitCost(priceOfFuelToCurrency(cost, parseInt(split)));
            }
        }
    }, [mpg, distance, pricePerLitre, split]);

    return (
        <>
            <View className="grid grid-cols-1 gap-8">
                <View className="flex gap-4">
                    <Text className="text-white text-lg">Distance (miles)</Text>
                    <TextInput
                        placeholder="0"
                        value={distance}
                        onChangeText={handleDistanceChange}
                        className={reusableStyles.textInput}
                        keyboardType="number-pad"
                    />
                </View>

                <View className="flex gap-4">
                    <Text className="text-white text-lg">
                        Price per litre (pence)
                    </Text>
                    <TextInput
                        placeholder="0"
                        value={pricePerLitre}
                        onChangeText={handlePricePerLitreChange}
                        className={reusableStyles.textInput}
                        keyboardType="number-pad"
                    />
                </View>

                <View className="flex gap-4">
                    <Text className="text-white text-lg">Miles per gallon</Text>
                    <TextInput
                        placeholder="0"
                        value={mpg}
                        onChangeText={handleMpgChange}
                        className={reusableStyles.textInput}
                        keyboardType="number-pad"
                    />
                </View>

                <View className="flex gap-4">
                    <Text className="text-white text-lg">
                        Split cost between # of people
                    </Text>
                    <TextInput
                        placeholder="1"
                        value={split}
                        onChangeText={handleSplitChange}
                        className={reusableStyles.textInput}
                        keyboardType="number-pad"
                    />
                </View>
            </View>

            <View className="border border-rounded-lg shadow-lg p-4">
                <Text className="text-white text-lg">Cost:</Text>
                <Text className="text-white text-3xl">£{cost}</Text>
            </View>
            <View className="border border-rounded-lg shadow-lg p-4">
                <Text className="text-white text-lg">Split Cost:</Text>
                <Text className="text-white text-3xl">£{splitCost}</Text>
            </View>
        </>
    );
}

export default function TabOneScreen() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView className="bg-slate-950">
            <ScrollView
                contentContainerClassName="px-4"
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: insets.bottom + 60,
                    paddingTop: insets.top,
                }}
                showsVerticalScrollIndicator={false}
            >
                <FuelCalculatorForm />
            </ScrollView>
        </SafeAreaView>
    );
}
