import { fuelPricesTable, journeysTable } from "@/db/schema";
import {
    calculatePriceOfFuel,
    DecimalPrecision2,
    priceOfFuelToCurrency,
} from "@/helpers/math";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertJourney, updateJourney } from "../db";
import { journeySchema } from "../schema";

export type JourneyRawFormValues = Omit<
    z.infer<typeof journeySchema>,
    "price" | "mpg" | "pricePerLitre" | "distanceInMiles" | "splitBetween"
> & {
    mpg: string | number;
    pricePerLitre: string | number;
    distanceInMiles: string | number;
    splitBetween: string | number;
};

export interface useJourneyFormProps {
    journey?: Partial<typeof fuelPricesTable.$inferInsert> & {
        title: string;
        id: number;
        mpg: number;
        price: number;
        pricePerLitre: number;
        distanceInMiles: number;
        splitBetween: number;
    };
    onSuccessfulSubmitCallback?: (
        result: typeof journeysTable.$inferSelect,
    ) => void;
    defaultFuelPrice?: number | null;
}

export default function useJourneyForm({
    journey,
    defaultFuelPrice,
    onSuccessfulSubmitCallback,
}: useJourneyFormProps) {
    const queryClient = useQueryClient();
    const [splitCost, setSplitCost] = useState("0");
    const [cost, setCost] = useState("0");
    const sqliteContext = useSQLiteContext();

    const form = useForm<JourneyRawFormValues>({
        resolver: zodResolver(journeySchema),
        defaultValues: journey
            ? {
                  title: journey.title,
                  mpg: String(journey.mpg),
                  pricePerLitre: String(journey.pricePerLitre),
                  distanceInMiles: String(journey.distanceInMiles),
                  splitBetween: String(journey.splitBetween),
              }
            : {
                  title: "",
                  mpg: "",
                  pricePerLitre: defaultFuelPrice
                      ? String(defaultFuelPrice)
                      : "",
                  distanceInMiles: "",
                  splitBetween: "1",
              },
    });

    const {
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = form;

    const setCostsCallbackRef = useCallback(() => {
        if (!journey?.price) return;

        setCost(journey.price.toFixed(2));

        if (journey?.splitBetween) {
            setSplitCost(
                DecimalPrecision2.round(
                    journey.price / journey.splitBetween,
                    2,
                ).toFixed(2),
            );
        }
    }, [journey?.price, journey?.splitBetween]);

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
            if (!mpg || !pricePerLitre || !distanceInMiles || !splitBetween) {
                setSplitCost("0");
                setCost("0");
                return;
            }

            const cost = calculatePriceOfFuel(
                Number(distanceInMiles),
                Number(pricePerLitre),
                Number(mpg),
            );

            const costFormatted = priceOfFuelToCurrency(cost);

            setCost(costFormatted);

            if (!splitBetween || Number(splitBetween) === 0) {
                setSplitCost(costFormatted);
            } else {
                setSplitCost(priceOfFuelToCurrency(cost, Number(splitBetween)));
            }
        },
        [],
    );

    const onSubmit = useCallback(
        async (values: JourneyRawFormValues) => {
            try {
                let result: typeof journeysTable.$inferSelect | null = null;
                const mpg = Number(values.mpg);
                const distanceInMiles = Number(values.distanceInMiles);
                const pricePerLitre = Number(values.pricePerLitre);
                const splitBetween = Number(values.splitBetween);
                const _cost = Number(cost);
                if (isNaN(_cost)) {
                    throw new Error("Cost must be a number");
                }

                if (journey && journey.id) {
                    result = await updateJourney(sqliteContext, journey.id, {
                        ...values,
                        mpg,
                        pricePerLitre,
                        distanceInMiles,
                        splitBetween,
                        price: _cost,
                    });
                } else {
                    result = await insertJourney(sqliteContext, {
                        ...values,
                        mpg,
                        pricePerLitre,
                        distanceInMiles,
                        splitBetween,
                        price: _cost,
                    });
                }

                queryClient.invalidateQueries({
                    queryKey: ["journeys"],
                });

                onSuccessfulSubmitCallback?.(result);
            } catch (error) {
                console.log("error: ", error);
                // TODO: show an error, might be able to use: https://github.com/nandorojo/burnt/
            }
        },
        [journey, sqliteContext, cost, queryClient, onSuccessfulSubmitCallback],
    );

    return {
        splitCost,
        cost,
        onSubmit,
        handleSubmit,
        errors,
        reset,
        setValue,
        setCostsCallbackRef,
        form,
    };
}
