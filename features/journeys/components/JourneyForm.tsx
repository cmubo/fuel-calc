import InputWrapper from "@/components/InputWrapper";
import TextInput from "@/components/TextInput";
import reusableStyles from "@/constants/reusable-styles";
import { fuelPricesTable } from "@/db/schema";
import { calculatePriceOfFuel, priceOfFuelToCurrency } from "@/helpers/math";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { insertJourney, updateJourney } from "../db";
import { journeySchema } from "../schema";

// This type represents the data structure as it exists in the form fields themselves
type JourneyRawFormValues = Omit<
    z.infer<typeof journeySchema>,
    "price" | "mpg" | "pricePerLitre" | "distanceInMiles" | "splitBetween"
> & {
    mpg: string | number;
    pricePerLitre: string | number;
    distanceInMiles: string | number;
    splitBetween: string | number;
    // price: string | number;
};

export default function JourneyForm({
    journey,
    onSuccessfulSubmitCallback,
}: {
    journey?: Partial<typeof fuelPricesTable.$inferInsert> & {
        id: number;
        mpg: number;
        price: number;
        pricePerLitre: number;
        distanceInMiles: number;
        splitBetween: number;
    };
    onSuccessfulSubmitCallback?: () => void;
}) {
    const [splitCost, setSplitCost] = useState("0");
    const [cost, setCost] = useState("0");

    const sqliteContext = useSQLiteContext();
    const form = useForm<JourneyRawFormValues>({
        resolver: zodResolver(journeySchema),
        defaultValues: journey
            ? {
                  mpg: String(journey.mpg),
                  pricePerLitre: String(journey.pricePerLitre),
                  distanceInMiles: String(journey.distanceInMiles),
                  splitBetween: String(journey.splitBetween),
                  //   price: String(journey.price),
              }
            : {
                  mpg: "",
                  pricePerLitre: "",
                  distanceInMiles: "",
                  splitBetween: "",
                  //   price: "",
              },
    });

    const {
        handleSubmit,
        getValues,
        formState: { errors },
        watch,
        reset,
    } = form;

    useEffect(() => {
        const { unsubscribe } = watch((values) => {
            onFieldChange(values);
        });
        return () => unsubscribe();
    }, [watch]);

    const onFieldChange = useCallback(
        ({
            mpg,
            pricePerLitre,
            distanceInMiles,
            splitBetween,
        }: {
            mpg?: string | number;
            pricePerLitre?: string | number;
            distanceInMiles?: string | number;
            splitBetween?: string | number;
        }) => {
            // const values = getValues();
            // const mpg = values.mpg;
            // const pricePerLitre = values.pricePerLitre;
            // const distanceInMiles = values.distanceInMiles;
            // const splitBetween = values.splitBetween;
            // const price = values.price;

            // console.log(values);
            if (!mpg || !pricePerLitre || !distanceInMiles || !splitBetween) {
                setSplitCost("0");
                setCost("0");
                // form.setValue("price", "");
                return;
            }

            const cost = calculatePriceOfFuel(
                Number(distanceInMiles),
                Number(pricePerLitre),
                Number(mpg),
            );

            const costFormatted = priceOfFuelToCurrency(cost);

            setCost(costFormatted);
            // form.setValue("price", costFormatted);

            if (!splitBetween || Number(splitBetween) === 0) {
                setSplitCost(costFormatted);
            } else {
                setSplitCost(priceOfFuelToCurrency(cost, Number(splitBetween)));
            }

            // console.log(values);
        },
        [],
    );

    const onSubmit = useCallback(
        async (values: JourneyRawFormValues) => {
            try {
                const mpg = Number(values.mpg);
                const distanceInMiles = Number(values.distanceInMiles);
                const pricePerLitre = Number(values.pricePerLitre);
                const splitBetween = Number(values.splitBetween);
                const _cost = Number(cost);
                if (isNaN(_cost)) {
                    throw new Error("Cost must be a number");
                }

                if (journey && journey.id) {
                    await updateJourney(sqliteContext, journey.id, {
                        ...values,
                        mpg,
                        pricePerLitre,
                        distanceInMiles,
                        splitBetween,
                        price: _cost,
                    });
                } else {
                    await insertJourney(sqliteContext, {
                        ...values,
                        mpg,
                        pricePerLitre,
                        distanceInMiles,
                        splitBetween,
                        price: _cost,
                    });
                }

                onSuccessfulSubmitCallback?.();
            } catch (error) {
                console.log("error: ", error);
                // TODO: show an error, might be able to use: https://github.com/nandorojo/burnt/
            }
        },
        [journey, sqliteContext, cost],
    );

    return (
        <View className="w-full flex flex-col gap-4">
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
                    <TextInput
                        name="pricePerLitre"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="125.50"
                        keyboardType="number-pad"
                    />
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
                        // onChange={onFieldChange}
                    />
                </InputWrapper>

                <View>
                    <Text className="text-white text-lg">Cost:</Text>
                    <Text className="text-white text-3xl">£{cost}</Text>
                </View>
                <View>
                    <Text className="text-white text-lg">Split Cost:</Text>
                    <Text className="text-white text-3xl">£{splitCost}</Text>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-cyan-500 rounded-lg p-3"
                >
                    <Text className="text-white text-center">Save Journey</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => reset()}
                    className="bg-red-500 rounded-lg p-3 mt-8"
                >
                    <Text className="text-white text-center">Reset Form</Text>
                </TouchableOpacity>
            </FormProvider>
        </View>
    );
}
