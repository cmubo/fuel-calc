import useJourneyForm from "@/features/journeys/hooks/useJourneyForm";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CalculatorWizardFooter from "./CalculatorWizardFooter";
import CalculatorWizardHeader from "./CalculatorWizardHeader";
import CalculatorWizardSteps from "./CalculatorWizardSteps";
import { STEPS } from "./constants";
import { PreviousFormValueType } from "./types";

export default function CalculatorWizard({
    defaultFuelPrice,
}: {
    defaultFuelPrice: number;
}) {
    const insets = useSafeAreaInsets();
    const [savedJourneyId, setSavedJourneyId] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousValues, setPreviousValues] = useState<
        PreviousFormValueType[]
    >([]);

    const { splitCost, cost, errors, form, onSubmit, litresUsed, gallonsUsed } =
        useJourneyForm({
            onSuccessfulSubmitCallback: (result) => {
                setCurrentIndex(Object.keys(STEPS).length - 1);
                setSavedJourneyId(result.id);
                setPreviousValues([]);
            },
            defaultFuelPrice,
        });

    const handleNavigation = async (direction: "forward" | "back") => {
        if (
            direction === "forward" &&
            currentIndex !== Object.keys(STEPS).length - 1
        ) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === "back" && currentIndex > 0) {
            setPreviousValues((prev) => {
                const currentStep = STEPS[currentIndex.toString()];

                if (currentStep.field !== null) {
                    prev.pop();
                }
                return prev;
            });
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <FormProvider {...form}>
            <KeyboardAvoidingView
                style={[styles.screenWrapper, { paddingTop: insets.top }]}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <CalculatorWizardHeader
                    index={currentIndex}
                    handleNavigation={handleNavigation}
                    previousValues={previousValues}
                />

                <View style={styles.mainContainer}>
                    <CalculatorWizardSteps
                        index={currentIndex}
                        errors={errors}
                        cost={cost}
                        splitCost={splitCost}
                        litresUsed={litresUsed}
                        gallonsUsed={gallonsUsed}
                        form={form}
                        savedJourneyId={savedJourneyId}
                    />
                </View>

                <CalculatorWizardFooter
                    index={currentIndex}
                    setIndex={setCurrentIndex}
                    form={form}
                    handleNavigation={handleNavigation}
                    setPreviousValues={setPreviousValues}
                    onSubmit={onSubmit}
                    setSavedJourneyId={setSavedJourneyId}
                />
            </KeyboardAvoidingView>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
        position: "relative",
    },
    mainContainer: {
        width: "100%",
        position: "absolute",
        top: "50%",
        transform: [{ translateY: "-50%" }],
    },
});
