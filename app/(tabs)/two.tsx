import { Text, View } from "@/components/Themed";
import { expoDb } from "@/db/db";
import * as schema from "@/db/schema";
import { fuelPricesTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
    const sqliteContext = useSQLiteContext();
    const db = drizzle(sqliteContext, { schema });

    const [items, setItems] = useState<
        (typeof fuelPricesTable.$inferSelect)[] | null
    >(null);

    useEffect(() => {
        (async () => {
            await db.delete(fuelPricesTable);
            await db.insert(fuelPricesTable).values([
                {
                    name: "John",
                    price: 123.54,
                },
                {
                    name: "John Doe",
                    price: 123.22,
                },
            ]);
            const users = await db.select().from(fuelPricesTable);
            setItems(users);
        })();
    }, []);

    if (items === null || items.length === 0) {
        return (
            <View>
                <Text>Empty</Text>
            </View>
        );
    }

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                justifyContent: "center",
            }}
        >
            <Text>{expoDb.databasePath}</Text>
            {items.map((item) => (
                <Text key={item.id}>{item.name}</Text>
            ))}
        </View>
    );
}
