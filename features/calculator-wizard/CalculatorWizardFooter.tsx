import ConfirmationButton from "@/components/ConfirmationButton";
import HeroIcon from "@/components/icons/HeroIcon";
import { GroteskText } from "@/components/StyledText";
import { twColors } from "@/constants/Colors";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { useQueryClient } from "@tanstack/react-query";
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
    onSubmit,
    setSavedJourneyId,
}: {
    handleNavigation: (direction: "forward" | "back") => void;
    index: number;
    form: UseFormReturn<JourneyRawFormValues, any, JourneyRawFormValues>;
    setPreviousValues: Dispatch<SetStateAction<PreviousFormValueType[]>>;
    setIndex: Dispatch<SetStateAction<number>>;
    setSavedJourneyId: Dispatch<SetStateAction<number | null>>;
    onSubmit: (values: JourneyRawFormValues) => Promise<void>;
}) {
    const currentStep = STEPS[index.toString()];
    const queryClient = useQueryClient();

    const onNavigation = useCallback(async () => {
        // Submit the form
        if (currentStep.name === "title") {
            await form.handleSubmit(onSubmit)();

            return;
        }

        // If this step doesnt have a form input
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

    const resetForm = useCallback(() => {
        form.reset();
        setPreviousValues([]);
        setIndex(0);
        setSavedJourneyId(null);

        queryClient.invalidateQueries({
            queryKey: ["defaultFuelPrice"],
        });
    }, [form, setPreviousValues, setIndex, setSavedJourneyId]);

    return (
        <View style={styles.footerContainer}>
            <View>
                {index !== 0 && currentStep.name !== "saved" ? (
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

            <NextButton
                onPress={onNavigation}
                index={index}
                resetForm={resetForm}
            >
                <NextButtonContent index={index} />
            </NextButton>
        </View>
    );
}

interface NextButtonProps {
    onPress: () => void;
    resetForm: () => void;
    index: number;
    children: React.ReactNode;
}

function NextButton({ onPress, index, resetForm, children }: NextButtonProps) {
    const currentStep = STEPS[index.toString()];
    const nextButtonWidth = useSharedValue(126);

    const nextButtonAnimatedStyles = useAnimatedStyle(() => ({
        width: withTiming(nextButtonWidth.value, { duration: 300 }),
    }));

    useEffect(() => {
        if (currentStep.name === "result") {
            nextButtonWidth.value = NEXT_BUTTON_WIDTH_LARGE;
        } else {
            nextButtonWidth.value = NEXT_BUTTON_WIDTH_SMALL;
        }
    }, [currentStep]);

    return (
        <AnimatedTouchable
            onPress={currentStep.name === "saved" ? resetForm : onPress}
            style={[styles.nextButton, nextButtonAnimatedStyles]}
        >
            {children}
        </AnimatedTouchable>
    );
}

function NextButtonContent({ index }: { index: number }) {
    const currentStep = STEPS[index.toString()];
    const nextButtonArrowTranslateX = useSharedValue(
        -NEXT_BUTTON_HORIZONTAL_PADDING,
    );

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
            // Reset the translate x to the right agin
            nextButtonArrowTranslateX.value = -NEXT_BUTTON_HORIZONTAL_PADDING;
        } else {
            nextButtonArrowTranslateX.value = calulateArrowXPosition("small");
        }
    }, [currentStep]);

    if (currentStep.name === "saved") {
        return (
            <Animated.View
                entering={FadeInLeft}
                exiting={FadeOut.duration(100)}
                style={{
                    width: "100%",
                }}
            >
                <GroteskText
                    style={[
                        styles.nextButtonText,
                        {
                            textAlign: "center",
                        },
                    ]}
                >
                    Start again?
                </GroteskText>
            </Animated.View>
        );
    }

    if (currentStep.name === "title") {
        return (
            <Animated.View
                entering={FadeInLeft}
                exiting={FadeOut.duration(100)}
                style={{
                    width: "100%",
                }}
            >
                <GroteskText
                    style={[
                        styles.nextButtonText,
                        {
                            textAlign: "center",
                        },
                    ]}
                >
                    Save
                </GroteskText>
            </Animated.View>
        );
    }

    return (
        <>
            <View>
                {currentStep.name === "result" ? (
                    <Animated.View
                        entering={FadeInLeft}
                        exiting={FadeOut.duration(100)}
                    >
                        <GroteskText style={styles.nextButtonText}>
                            Save Journey?
                        </GroteskText>
                    </Animated.View>
                ) : null}
            </View>

            {currentStep.name !== "saved" ? (
                <AnimatedHeroIcon
                    icon="arrow-long-right"
                    color="white"
                    size={NEXT_BUTTON_ARROW_SIZE}
                    style={[
                        { position: "absolute", right: 0 },
                        nextButtonArrowStyles,
                    ]}
                />
            ) : null}
        </>
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
    nextButtonText: {
        fontSize: 12,
        lineHeight: 30,
    },
});
