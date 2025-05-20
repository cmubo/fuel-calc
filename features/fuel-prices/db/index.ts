import * as schema from "@/db/schema";
import { fuelPricesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function getAllFuelPrices(SQLite: SQLiteDatabase) {
    const db = drizzle(SQLite, { schema });

    return db.select().from(fuelPricesTable);
}

export async function getDefaultFuelPrice(SQLite: SQLiteDatabase) {
    const db = drizzle(SQLite, { schema });

    return db
        .select()
        .from(fuelPricesTable)
        .where(eq(fuelPricesTable.isDefault, 1))
        .limit(1);
}

export async function insertFuelPrice(
    SQLite: SQLiteDatabase,
    data: typeof fuelPricesTable.$inferInsert,
) {
    const db = drizzle(SQLite, { schema });

    const [newFuelPrice] = await db
        .insert(fuelPricesTable)
        .values([data])
        .returning();

    if (!newFuelPrice) throw new Error("Failed to insert fuel price");

    return newFuelPrice;
}

export async function updateFuelPrice(
    SQLite: SQLiteDatabase,
    id: number,
    data: Partial<typeof fuelPricesTable.$inferInsert>,
) {
    const db = drizzle(SQLite, { schema });

    const [updatedFuelPrice] = await db
        .update(fuelPricesTable)
        .set(data)
        .where(eq(fuelPricesTable.id, id))
        .returning();

    if (updatedFuelPrice == null) {
        throw new Error("Failed to update fuel price");
    }

    return updatedFuelPrice;
}

export async function setDefaultFuelPrice(SQLite: SQLiteDatabase, id: number) {
    const db = drizzle(SQLite, { schema });
    const updatedFuelPrice = await db.transaction(async (trx) => {
        const currentDefaults = await db
            .select()
            .from(fuelPricesTable)
            .where(eq(fuelPricesTable.isDefault, 1));

        if (currentDefaults.length > 0) {
            for (const currentDefault of currentDefaults) {
                await trx
                    .update(fuelPricesTable)
                    .set({ isDefault: 0 })
                    .where(eq(fuelPricesTable.id, currentDefault.id));
            }
        }

        const [updatedFuelPrice] = await trx
            .update(fuelPricesTable)
            .set({ isDefault: 1 })
            .where(eq(fuelPricesTable.id, id))
            .returning();

        if (!updatedFuelPrice) {
            trx.rollback();
            throw new Error("Failed to set default fuel price");
        }

        return updatedFuelPrice;
    });

    return updatedFuelPrice;
}

export async function deleteFuelPrice(SQLite: SQLiteDatabase, id: number) {
    const db = drizzle(SQLite, { schema });

    const [deletedPackaging] = await db
        .delete(fuelPricesTable)
        .where(eq(fuelPricesTable.id, id))
        .returning();

    if (deletedPackaging == null)
        throw new Error("Failed to delete fuel price");

    return deletedPackaging;
}
