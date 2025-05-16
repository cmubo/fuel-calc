import TextInput from "@/components/TextInput";
import reusableStyles from "@/constants/reusable-styles";
import { fuelPricesTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
    fuelPrice?: Partial<typeof fuelPricesTable.$inferSelect> & {
        id: number;
        name: string;
        price: number;
    };
    onSuccessfulSubmitCallback?: () => void;
}) {
    const sqliteContext = useSQLiteContext();
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

                onSuccessfulSubmitCallback?.();
            } catch (error) {
                console.log("error: ", error);
                // TODO: show an error, might be able to use: https://github.com/nandorojo/burnt/
            }
        },
        [fuelPrice, sqliteContext],
    );

    return (
        <View className="w-full flex flex-col gap-4">
            <FormProvider {...form}>
                <TextInput
                    name="name"
                    label="Name"
                    className={reusableStyles.textInput}
                    autoCorrect={false}
                    placeholder="Costco"
                />

                {errors.name && (
                    <Text className="text-white">This is required.</Text>
                )}

                <TextInput
                    name="price"
                    label="Price"
                    className={reusableStyles.textInput}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    placeholder="125.25"
                />

                {errors.price && (
                    <Text className="text-white">{errors.price.message}</Text>
                )}

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
