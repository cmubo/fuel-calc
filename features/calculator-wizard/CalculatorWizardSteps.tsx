import { GroteskTextMedium } from "@/components/StyledText";
import TextInput from "@/components/TextInput";
import { twColors } from "@/constants/Colors";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { useEffect, useRef } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import {
    Keyboard,
    TextInput as RNTextInput,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputWrapper from "./CalculatorWizardInputWrapper";
import CalculatorWizardSelectFuelPriceModal from "./CalculatorWizardSelectFuelPrice";
import { STEPS } from "./constants";

export default function CalculatorWizardSteps({
    index,
    errors,
    cost,
    splitCost,
    form,
}: {
    index: number;
    errors: FieldErrors<JourneyRawFormValues>;
    cost: string;
    splitCost: string;
    form: UseFormReturn<JourneyRawFormValues, any, JourneyRawFormValues>;
}) {
    const currentStep = STEPS[index.toString()];
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
        useWindowDimensions();
    const insets = useSafeAreaInsets();
    const mpgRef = useRef<RNTextInput>(null);
    const pricePerLitreRef = useRef<RNTextInput>(null);
    const distanceInMilesRef = useRef<RNTextInput>(null);
    const splitBetweenRef = useRef<RNTextInput>(null);

    const sliderTranslateX = useSharedValue(0);

    const animatedSliderStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(sliderTranslateX.value, {
                    duration: 300,
                    easing: Easing.inOut(Easing.quad),
                }),
            },
        ],
    }));

    useEffect(() => {
        sliderTranslateX.value = -(SCREEN_WIDTH * index);

        if (currentStep.name === "pricePerLitre") {
            pricePerLitreRef.current?.focus();
        } else if (currentStep.name === "distanceInMiles") {
            distanceInMilesRef.current?.focus();
        } else if (currentStep.name === "splitBetween") {
            splitBetweenRef.current?.focus();
        } else {
            Keyboard.dismiss();
        }
    }, [index]);

    return (
        <Animated.View
            style={[
                styles.slider,
                animatedSliderStyles,
                { paddingTop: insets.top },
            ]}
        >
            <View style={{ width: SCREEN_WIDTH, padding: 24 }}>
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
                        placeholderTextColor={twColors.slate[600]}
                        ref={mpgRef}
                    />
                </InputWrapper>
            </View>
            <View style={{ width: SCREEN_WIDTH, padding: 24 }}>
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
                        placeholderTextColor={twColors.slate[600]}
                        ref={pricePerLitreRef}
                    />

                    <View style={{ paddingTop: 10 }}>
                        <CalculatorWizardSelectFuelPriceModal
                            onFuelPriceSelect={(price) =>
                                form.setValue("pricePerLitre", String(price))
                            }
                        />
                    </View>
                </InputWrapper>
            </View>

            <View style={{ width: SCREEN_WIDTH, padding: 24 }}>
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
                        placeholderTextColor={twColors.slate[600]}
                        ref={distanceInMilesRef}
                    />
                </InputWrapper>
            </View>

            <View style={{ width: SCREEN_WIDTH, padding: 24 }}>
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
                        placeholderTextColor={twColors.slate[600]}
                        ref={splitBetweenRef}
                    />
                </InputWrapper>
            </View>
            <View style={{ width: SCREEN_WIDTH, padding: 24 }}>
                <FinalCostStep cost={cost} splitCost={splitCost} />
            </View>
        </Animated.View>
    );
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
    slider: {
        flexDirection: "row",
    },
    textInput: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        padding: 10,
        color: "white",
        width: "100%",
        fontSize: 16,
    },
});
