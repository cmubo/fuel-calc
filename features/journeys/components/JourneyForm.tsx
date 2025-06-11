import ConfirmationButton from "@/components/ConfirmationButton";
import DatePicker from "@/components/DatePicker";
import HeroIcon from "@/components/icons/HeroIcon";
import InputWrapper from "@/components/InputWrapper";
import { GroteskText, GroteskTextMedium } from "@/components/StyledText";
import TextInput from "@/components/TextInput";
import { twColors } from "@/constants/Colors";
import reusableStyles from "@/constants/reusable-styles";
import { fuelPricesTable } from "@/db/schema";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Pressable, TouchableOpacity, View } from "react-native";
import useJourneyForm from "../hooks/useJourneyForm";
import SelectFuelPriceModal from "./SelectFuelPriceModal";

interface JourneyFormProps {
    journey?: Partial<typeof fuelPricesTable.$inferInsert> & {
        title: string;
        id: number;
        mpg: number;
        price: number;
        pricePerLitre: number;
        distanceInMiles: number;
        splitBetween: number;
        dateOfJourney: string;
    };
    onSuccessfulSubmitCallback?: () => void;
    defaultFuelPrice?: number | null;
}

export default function JourneyForm({
    journey,
    onSuccessfulSubmitCallback,
    defaultFuelPrice,
}: JourneyFormProps) {
    const [datepickerModalOpen, setDatepickerModalOpen] = useState(false);

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
        litresUsed,
        gallonsUsed,
    } = useJourneyForm({
        journey,
        onSuccessfulSubmitCallback,
        defaultFuelPrice,
    });

    return (
        <View className="flex-1 gap-4">
            <FormProvider {...form}>
                <InputWrapper label="Title" errors={errors.title}>
                    <TextInput
                        name="title"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="Journey to Mordor"
                    />
                </InputWrapper>
                <InputWrapper
                    label="Date of journey"
                    errors={errors.dateOfJourney}
                >
                    <Pressable
                        onPress={() => {
                            setDatepickerModalOpen(true);
                        }}
                    >
                        <TextInput
                            name="dateOfJourney"
                            className={reusableStyles.textInput}
                            autoCorrect={false}
                            editable={false}
                            onPress={() => {
                                setDatepickerModalOpen(true);
                            }}
                        />
                    </Pressable>
                    <View>
                        <DatePicker
                            name="dateOfJourney"
                            modal
                            open={datepickerModalOpen}
                            setOpen={setDatepickerModalOpen}
                        />
                    </View>
                </InputWrapper>

                <InputWrapper label="Miles Per Gallon" errors={errors.mpg}>
                    <TextInput
                        name="mpg"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="35"
                        keyboardType="decimal-pad"
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
                            keyboardType="decimal-pad"
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
                        keyboardType="decimal-pad"
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

                <View className="flex-1 items-center justify-center flex-row gap-2">
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="bg-sky-500 rounded-lg p-3 w-full flex-1"
                    >
                        <GroteskTextMedium
                            className="text-white text-center text-lg"
                            style={{ lineHeight: 20 }}
                        >
                            Save Journey
                        </GroteskTextMedium>
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
