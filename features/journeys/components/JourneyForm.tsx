import ConfirmationButton from "@/components/ConfirmationButton";
import HeroIcon from "@/components/icons/HeroIcon";
import InputWrapper from "@/components/InputWrapper";
import TextInput from "@/components/TextInput";
import { twColors } from "@/constants/Colors";
import reusableStyles from "@/constants/reusable-styles";
import { fuelPricesTable } from "@/db/schema";
import { FormProvider } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import useJourneyForm from "../hooks/useJourneyForm";
import SelectFuelPriceModal from "./SelectFuelPriceModal";

interface JourneyFormProps {
    journey?: Partial<typeof fuelPricesTable.$inferInsert> & {
        id: number;
        mpg: number;
        price: number;
        pricePerLitre: number;
        distanceInMiles: number;
        splitBetween: number;
    };
    onSuccessfulSubmitCallback?: () => void;
    defaultFuelPrice?: number | null;
}

export default function JourneyForm({
    journey,
    onSuccessfulSubmitCallback,
    defaultFuelPrice,
}: JourneyFormProps) {
    const {
        splitCost,
        cost,
        onSubmit,
        handleSubmit,
        errors,
        reset,
        setValue,
        setCostsCallbackRef,
        form,
    } = useJourneyForm({
        journey,
        onSuccessfulSubmitCallback,
        defaultFuelPrice,
    });

    return (
        <View className="flex-1 gap-4">
            <FormProvider {...form}>
                <InputWrapper label="Miles Per Gallon" errors={errors.mpg}>
                    <TextInput
                        name="mpg"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="35"
                        keyboardType="number-pad"
                    />
                </InputWrapper>

                <InputWrapper
                    label="Price Per Litre (pence)"
                    errors={errors.pricePerLitre}
                >
                    <View className="flex-1 flex-row gap-2">
                        <TextInput
                            name="pricePerLitre"
                            className={reusableStyles.textInput}
                            autoCorrect={false}
                            placeholder="125.50"
                            keyboardType="number-pad"
                        />

                        <SelectFuelPriceModal
                            onFuelPriceSelect={(price) =>
                                setValue("pricePerLitre", String(price))
                            }
                        />
                    </View>
                </InputWrapper>

                <InputWrapper
                    label="Distance In Miles"
                    errors={errors.distanceInMiles}
                >
                    <TextInput
                        name="distanceInMiles"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="100"
                        keyboardType="number-pad"
                    />
                </InputWrapper>

                <InputWrapper
                    label="Split Between # of people"
                    errors={errors.splitBetween}
                >
                    <TextInput
                        name="splitBetween"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="1"
                        keyboardType="number-pad"
                    />
                </InputWrapper>

                <View ref={setCostsCallbackRef} className="gap-2">
                    <View>
                        <Text className="text-white text-lg">Cost:</Text>
                        <Text className="text-white text-3xl">£{cost}</Text>
                    </View>
                    <View>
                        <Text className="text-white text-lg">Split Cost:</Text>
                        <Text className="text-white text-3xl">
                            £{splitCost}
                        </Text>
                    </View>
                </View>

                <View className="flex-1 items-center justify-center flex-row gap-2">
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="bg-cyan-500 rounded-lg p-3 w-full flex-1"
                    >
                        <Text
                            className="text-white text-center text-lg"
                            style={{ lineHeight: 20 }}
                        >
                            Save Journey
                        </Text>
                    </TouchableOpacity>

                    <ConfirmationButton
                        className="bg-red-500 rounded-lg p-3"
                        action={reset}
                        title="Reset form inputs"
                        subtitle="Are you sure you want to reset all form inputs?"
                    >
                        <HeroIcon icon="arrow-path" color={twColors.white} />
                    </ConfirmationButton>
                </View>
            </FormProvider>
        </View>
    );
}
