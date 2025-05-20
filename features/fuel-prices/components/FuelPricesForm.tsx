import InputWrapper from "@/components/InputWrapper";
import TextInput from "@/components/TextInput";
import reusableStyles from "@/constants/reusable-styles";
import { fuelPricesTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { insertFuelPrice, updateFuelPrice } from "../db";
import { fuelPriceSchema } from "../schema";

// This type represents the data structure as it exists in the form fields themselves
type FuelPriceRawFormValues = Omit<z.infer<typeof fuelPriceSchema>, "price"> & {
    price: string | number; // Price is a string in the form input and a number in the db schema
};

export default function FuelPricesForm({
    fuelPrice,
    onSuccessfulSubmitCallback,
}: {
    fuelPrice?: Partial<typeof fuelPricesTable.$inferInsert> & {
        id: number;
        name: string;
        price: number;
    };
    onSuccessfulSubmitCallback?: () => void;
}) {
    const sqliteContext = useSQLiteContext();
    const queryClient = useQueryClient();

    const form = useForm<FuelPriceRawFormValues>({
        resolver: zodResolver(fuelPriceSchema),
        defaultValues: fuelPrice
            ? {
                  name: fuelPrice.name,
                  price: String(fuelPrice.price),
              }
            : {
                  name: "",
                  price: "",
              },
    });
    const {
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = useCallback(
        async (values: FuelPriceRawFormValues) => {
            try {
                const price = Number(values.price);
                if (isNaN(price)) {
                    throw new Error("Price must be a number");
                }

                if (fuelPrice && fuelPrice.id) {
                    await updateFuelPrice(sqliteContext, fuelPrice.id, {
                        ...values,
                        price: price,
                    });
                } else {
                    await insertFuelPrice(sqliteContext, {
                        ...values,
                        price: price,
                    });
                }

                queryClient.invalidateQueries({
                    queryKey: ["fuelPrices"],
                });

                onSuccessfulSubmitCallback?.();
            } catch (error) {
                console.log("error: ", error);
                // TODO: show an error, might be able to use: https://github.com/nandorojo/burnt/
            }
        },
        [fuelPrice, sqliteContext, onSuccessfulSubmitCallback, queryClient],
    );

    return (
        <View className="w-full flex flex-col gap-4">
            <FormProvider {...form}>
                <InputWrapper label="Name" errors={errors.name}>
                    <TextInput
                        name="name"
                        className={reusableStyles.textInput}
                        autoCorrect={false}
                        placeholder="Costco"
                    />
                </InputWrapper>

                <InputWrapper label="Price" errors={errors.price}>
                    <TextInput
                        name="price"
                        className={reusableStyles.textInput}
                        keyboardType="number-pad"
                        autoCorrect={false}
                        placeholder="125.25"
                    />
                </InputWrapper>

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-cyan-500 rounded-lg p-3"
                >
                    <Text className="text-white text-center">Submit</Text>
                </TouchableOpacity>
            </FormProvider>
        </View>
    );
}
