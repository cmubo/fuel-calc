import { fuelPricesTable } from "@/db/schema";
import { getAllFuelPrices } from "@/features/fuel-prices/db";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function FuelPricesPageContainer() {
    const sqliteContext = useSQLiteContext();
    const fuelPrices = getAllFuelPrices(sqliteContext);

    return (
        <Suspense
            fallback={
                <View className="flex items-center justify-center w-full h-full flex-col">
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="my-3"
                    />
                </View>
            }
        >
            <FuelPricesPage dataPromise={fuelPrices} />
        </Suspense>
    );
}

interface FuelPricesPageProps {
    dataPromise: Promise<
        {
            id: number;
            name: string;
            price: number;
            createdAt: string;
            updatedAt: string;
        }[]
    >;
}
function FuelPricesPage({ dataPromise }: FuelPricesPageProps) {
    const fuelPrices = use(dataPromise);

    return (
        <View className="flex items-center justify-center w-full h-full flex-col">
            <FlatList
                data={fuelPrices}
                renderItem={({ item }) => <FuelPriceItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View>
                        <Text>No fuel prices saved</Text>
                    </View>
                }
            />
        </View>
    );
}

function FuelPriceItem({
    name,
    price,
    updatedAt,
}: typeof fuelPricesTable.$inferSelect) {
    return (
        <View className="flex flex-row gap-4">
            <Text>{name}</Text>
            <Text>{price}</Text>
            <Text>{updatedAt}</Text>
        </View>
    );
}
