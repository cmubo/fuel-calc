import * as schema from "@/db/schema";
import timedPromise from "@/helpers/timed-promise";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function getAllFuelPrices(SQLite: SQLiteDatabase) {
    await timedPromise(2); // TODO: remove this
    const db = drizzle(SQLite, { schema });

    return db.query.fuelPricesTable.findMany();
}
