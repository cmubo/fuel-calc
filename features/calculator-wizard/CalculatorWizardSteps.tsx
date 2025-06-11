import DatePicker from "@/components/DatePicker";
import ModalDatePickerField from "@/components/ModalDatePickerField";
import {
    GroteskText,
    GroteskTextBold,
    GroteskTextMedium,
} from "@/components/StyledText";
import TextInput from "@/components/TextInput";
import { twColors } from "@/constants/Colors";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { Link } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import {
    Keyboard,
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ViewStyle,
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
    savedJourneyId,
    litresUsed,
    gallonsUsed,
}: {
    index: number;
    errors: FieldErrors<JourneyRawFormValues>;
    cost: string;
    splitCost: string;
    form: UseFormReturn<JourneyRawFormValues, any, JourneyRawFormValues>;
    savedJourneyId: number | null;
    litresUsed: string;
    gallonsUsed: string;
}) {
    const currentStep = STEPS[index.toString()];
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
        useWindowDimensions();
    const insets = useSafeAreaInsets();
    const mpgRef = useRef<RNTextInput>(null);
    const pricePerLitreRef = useRef<RNTextInput>(null);
    const distanceInMilesRef = useRef<RNTextInput>(null);
    const splitBetweenRef = useRef<RNTextInput>(null);
    const titleRef = useRef<RNTextInput>(null);

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

    const slideStyles = useMemo(() => {
        return {
            width: SCREEN_WIDTH,
            padding: 24,
            justifyContent: "center",
        } as ViewStyle;
    }, [SCREEN_WIDTH]);

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
            <View style={slideStyles}>
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
            <View style={slideStyles}>
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

            <View style={slideStyles}>
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

            <View style={slideStyles}>
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

            <View style={slideStyles}>
                <FinalCostStep
                    cost={cost}
                    splitCost={splitCost}
                    litresUsed={litresUsed}
                    gallonsUsed={gallonsUsed}
                />
            </View>

            <View style={slideStyles}>
                <InputWrapper
                    label="Date of your journey"
                    errors={errors.dateOfJourney}
                >
                    <DateAdded />
                </InputWrapper>
            </View>

            <View style={slideStyles}>
                <InputWrapper
                    label="Title"
                    subLabel="(Name your journey)"
                    errors={errors.title}
                >
                    <TextInput
                        name="title"
                        style={styles.textInput}
                        autoCorrect={false}
                        placeholder="Home to Windermere and back"
                        key="title"
                        placeholderTextColor={twColors.slate[600]}
                        ref={titleRef}
                    />
                </InputWrapper>
            </View>

            <View style={slideStyles}>
                <View>
                    <GroteskTextBold className="text-white text-3xl">
                        Success!
                    </GroteskTextBold>
                    <GroteskTextMedium className="text-white text-xl">
                        Your journey has been saved!
                    </GroteskTextMedium>

                    <TouchableOpacity className="mt-8">
                        <Link
                            href={
                                savedJourneyId
                                    ? `/(modals)/editJourney/${savedJourneyId}`
                                    : "/(tabs)/journeys"
                            }
                        >
                            <GroteskTextMedium
                                className="text-xl"
                                style={{ color: twColors.sky["200"] }}
                            >
                                Go to your journey?
                            </GroteskTextMedium>
                        </Link>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}

interface FinalCostStepProps {
    cost: string;
    splitCost: string;
    litresUsed: string;
    gallonsUsed: string;
}

function FinalCostStep({
    cost,
    splitCost,
    litresUsed,
    gallonsUsed,
}: FinalCostStepProps) {
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
            <View>
                <GroteskTextMedium className="text-white text-lg">
                    Fuel Used:
                </GroteskTextMedium>
                <GroteskText className="text-white text-lg">
                    {litresUsed} litres or {gallonsUsed} gallons
                </GroteskText>
            </View>
        </View>
    );
}

function DateAdded() {
    if (Platform.OS === "ios") {
        return <DatePicker name="dateOfJourney" />;
    }

    return (
        <ModalDatePickerField
            name="dateOfJourney"
            buttonStyles={styles.textInput}
        />
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
