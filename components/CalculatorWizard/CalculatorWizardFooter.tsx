import { twColors } from "@/constants/Colors";
import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import HeroIcon from "../icons/HeroIcon";
import { STEPS } from "./constants";
import { PreviousFormValueType } from "./types";

export default function CalculatorWizardFooter({
    handleNavigation,
    index,
    form,
    setPreviousValues,
}: {
    handleNavigation: (direction: "forward" | "back") => void;
    index: number;
    form: UseFormReturn<JourneyRawFormValues, any, JourneyRawFormValues>;
    setPreviousValues: Dispatch<SetStateAction<PreviousFormValueType[]>>;
}) {
    const onNavigation = () => {
        const currentStep = STEPS[index.toString()];

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
    };

    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={onNavigation} style={styles.nextButton}>
                <HeroIcon icon="arrow-long-right" color="white" size={30} />
            </TouchableOpacity>
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
        justifyContent: "center",
    },
    nextButton: {
        backgroundColor: twColors.sky[950],
        paddingVertical: 12,
        paddingHorizontal: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});
