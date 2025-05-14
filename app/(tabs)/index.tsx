import { View } from "@/components/Themed";
import { calculatePriceOfFuel, DecimalPrecision2 } from "@/helpers/math";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";
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
            const costFormatted = DecimalPrecision2.round(
                cost / 100,
                2,
            ).toFixed(2);
            setCost(costFormatted);

            if (!split || split === "0") {
                setSplitCost(costFormatted);
            } else {
                setSplitCost(
                    DecimalPrecision2.round(
                        cost / parseInt(split) / 100,
                        2,
                    ).toFixed(2),
                );
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
                        className="flex text-white rounded-lg text-2xl border-blue-500 border-2 p-4 px-6"
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
                        className="flex text-white rounded-lg text-2xl border-blue-500 border-2 p-4 px-6"
                        keyboardType="number-pad"
                    />
                </View>

                <View className="flex gap-4">
                    <Text className="text-white text-lg">Miles per gallon</Text>
                    <TextInput
                        placeholder="0"
                        value={mpg}
                        onChangeText={handleMpgChange}
                        className="flex text-white rounded-lg text-2xl border-blue-500 border-2 p-4 px-6"
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
                        className="flex text-white rounded-lg text-2xl border-blue-500 border-2 p-4 px-6"
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
    );
}
