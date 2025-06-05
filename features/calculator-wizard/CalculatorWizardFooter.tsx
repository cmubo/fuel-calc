import ConfirmationButton from "@/components/ConfirmationButton";
import HeroIcon from "@/components/icons/HeroIcon";
import { GroteskText } from "@/components/StyledText";
import { twColors } from "@/constants/Colors";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInLeft,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { STEPS } from "./constants";
import { PreviousFormValueType } from "./types";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedHeroIcon = Animated.createAnimatedComponent(HeroIcon);
const AnimatedConfirmationButton =
    Animated.createAnimatedComponent(ConfirmationButton);

const NEXT_BUTTON_WIDTH_SMALL = 126;
const NEXT_BUTTON_WIDTH_LARGE = 160;
const NEXT_BUTTON_ARROW_SIZE = 30;
const NEXT_BUTTON_HORIZONTAL_PADDING = 16;

function calulateArrowXPosition(buttonSize: "large" | "small") {
    const buttonWidth =
        buttonSize === "large"
            ? NEXT_BUTTON_WIDTH_LARGE
            : NEXT_BUTTON_WIDTH_SMALL;
    return -(buttonWidth - NEXT_BUTTON_ARROW_SIZE) / 2;
}
export default function CalculatorWizardFooter({
    handleNavigation,
    index,
    form,
    setPreviousValues,
    setIndex,
}: {
    handleNavigation: (direction: "forward" | "back") => void;
    index: number;
    form: UseFormReturn<JourneyRawFormValues, any, JourneyRawFormValues>;
    setPreviousValues: Dispatch<SetStateAction<PreviousFormValueType[]>>;
    setIndex: Dispatch<SetStateAction<number>>;
}) {
    const currentStep = STEPS[index.toString()];
    const nextButtonWidth = useSharedValue(126);
    const nextButtonArrowTranslateX = useSharedValue(
        -NEXT_BUTTON_HORIZONTAL_PADDING,
    );

    const nextButtonAnimatedStyles = useAnimatedStyle(() => ({
        width: withTiming(nextButtonWidth.value, { duration: 300 }),
    }));

    const nextButtonArrowStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(nextButtonArrowTranslateX.value, {
                    duration: 300,
                }),
            },
        ],
    }));

    useEffect(() => {
        if (currentStep.name === "result") {
            nextButtonWidth.value = NEXT_BUTTON_WIDTH_LARGE;
            // Reset the translate x to the right agin
            nextButtonArrowTranslateX.value = -NEXT_BUTTON_HORIZONTAL_PADDING;
        } else {
            nextButtonWidth.value = NEXT_BUTTON_WIDTH_SMALL;

            nextButtonArrowTranslateX.value = calulateArrowXPosition("small");
        }
    }, [currentStep]);

    const onNavigation = useCallback(() => {
        if (currentStep.field !== null) {
            const validation = form.trigger(
                currentStep.field as keyof JourneyRawFormValues,
            );

            // Validate the field here
            validation.then((result: boolean) => {
                if (result) {
                    const fieldValue = form.getValues(currentStep.field!);

                    setPreviousValues((prev) => {
                        // If the previous value already exists, just change the value
                        const prevValueAlreadyExists = prev.some(
                            (prevValue) => {
                                if (prevValue.name === currentStep.field) {
                                    prevValue.value = fieldValue as string;
                                    return true;
                                }
                                return false;
                            },
                        );

                        if (prevValueAlreadyExists) {
                            // Return the previous array with the newly changed value
                            return prev;
                        } else {
                            // Otherwise return new array
                            return [
                                ...prev,
                                {
                                    label: currentStep.label!,
                                    name: currentStep.field!,
                                    value: fieldValue as string,
                                },
                            ];
                        }
                    });

                    handleNavigation("forward");
                }
            });
        } else {
            handleNavigation("forward");
        }
    }, [handleNavigation, form, currentStep]);

    const resetForm = () => {
        form.reset();
        setPreviousValues([]);
        setIndex(0);
    };

    return (
        <View style={styles.footerContainer}>
            <View>
                {currentStep.name === "result" ? (
                    <AnimatedConfirmationButton
                        entering={FadeIn}
                        exiting={FadeOut}
                        action={resetForm}
                        title="Reset form inputs"
                        subtitle="Are you sure you want to reset all form inputs?"
                    >
                        <GroteskText style={{ color: twColors.sky[200] }}>
                            Reset?
                        </GroteskText>
                    </AnimatedConfirmationButton>
                ) : null}
            </View>

            <AnimatedTouchable
                onPress={onNavigation}
                style={[styles.nextButton, nextButtonAnimatedStyles]}
            >
                <View>
                    {currentStep.name === "result" ? (
                        <Animated.View
                            entering={FadeInLeft}
                            exiting={FadeOut.duration(100)}
                        >
                            <GroteskText style={{ fontSize: 12 }}>
                                Save Journey?
                            </GroteskText>
                        </Animated.View>
                    ) : null}
                </View>
                <AnimatedHeroIcon
                    icon="arrow-long-right"
                    color="white"
                    size={NEXT_BUTTON_ARROW_SIZE}
                    style={[
                        { position: "absolute", right: 0 },
                        nextButtonArrowStyles,
                    ]}
                />
            </AnimatedTouchable>
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
    },
    mainContainer: {
        padding: 24,
        width: "100%",
    },
    footerContainer: {
        padding: 24,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    nextButton: {
        position: "relative",
        height: 54,
        backgroundColor: twColors.sky[950],
        paddingVertical: 12,
        paddingHorizontal: NEXT_BUTTON_HORIZONTAL_PADDING,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        flexDirection: "row",
    },
});
