import { GroteskTextMedium } from "@/components/StyledText";
import TextInput from "@/components/TextInput";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputWrapper from "./CalculatorWizardInputWrapper";

export default function CalculatorWizardSteps({
    index,
    errors,
    cost,
    splitCost,
}: {
    index: number;
    errors: FieldErrors<JourneyRawFormValues>;
    cost: string;
    splitCost: string;
}) {
    if (index === 0) {
        return (
            <>
                <InputWrapper
                    label="MPG"
                    subLabel="(Miles Per Gallon)"
                    errors={errors.mpg}
                >
                    <TextInput
                        name="mpg"
                        autoCorrect={false}
                        placeholder="35"
                        keyboardType="decimal-pad"
                        style={styles.textInput}
                        key="mpg"
                    />
                </InputWrapper>
            </>
        );
    } else if (index === 1) {
        return (
            <>
                <InputWrapper
                    label="Price Per Litre"
                    subLabel="(Pence)"
                    errors={errors.pricePerLitre}
                >
                    <TextInput
                        name="pricePerLitre"
                        style={styles.textInput}
                        autoCorrect={false}
                        placeholder="125.50"
                        keyboardType="decimal-pad"
                        key="pricePerLitre"
                    />
                </InputWrapper>
            </>
        );
    } else if (index === 2) {
        return (
            <>
                <InputWrapper
                    label="Distance"
                    subLabel="(Miles)"
                    errors={errors.distanceInMiles}
                >
                    <TextInput
                        name="distanceInMiles"
                        style={styles.textInput}
                        autoCorrect={false}
                        placeholder="100"
                        keyboardType="decimal-pad"
                        key="distanceInMiles"
                    />
                </InputWrapper>
            </>
        );
    } else if (index === 3) {
        return (
            <>
                <InputWrapper
                    label="Split Between"
                    subLabel="(# of people)"
                    errors={errors.splitBetween}
                >
                    <TextInput
                        name="splitBetween"
                        style={styles.textInput}
                        autoCorrect={false}
                        placeholder="1"
                        keyboardType="number-pad"
                        key="splitBetween"
                    />
                </InputWrapper>
            </>
        );
    } else if (index === 4) {
        return <FinalCostStep cost={cost} splitCost={splitCost} />;
    }

    return null;
}

interface FinalCostStepProps {
    cost: string;
    splitCost: string;
}

function FinalCostStep({ cost, splitCost }: FinalCostStepProps) {
    return (
        <View className="gap-2">
            <View>
                <GroteskTextMedium className="text-white text-lg">
                    Cost:
                </GroteskTextMedium>
                <GroteskTextMedium className="text-white text-3xl">
                    £{cost}
                </GroteskTextMedium>
            </View>
            <View>
                <GroteskTextMedium className="text-white text-lg">
                    Split Cost:
                </GroteskTextMedium>
                <GroteskTextMedium className="text-white text-3xl">
                    £{splitCost}
                </GroteskTextMedium>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        padding: 10,
        color: "white",
        width: "100%",
        fontSize: 16,
    },
});
