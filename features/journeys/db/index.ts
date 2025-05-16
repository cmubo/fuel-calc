import * as schema from "@/db/schema";
import { journeysTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function getAllJourneys(SQLite: SQLiteDatabase) {
    const db = drizzle(SQLite, { schema });

    return db.select().from(journeysTable);
}

export async function insertJourney(
    SQLite: SQLiteDatabase,
    data: typeof journeysTable.$inferInsert,
) {
    const db = drizzle(SQLite, { schema });

    const [newJourney] = await db
        .insert(journeysTable)
        .values([data])
        .returning();

    if (!newJourney) throw new Error("Failed to insert journey");

    return newJourney;
}

export async function updateJourney(
    SQLite: SQLiteDatabase,
    id: number,
    data: Partial<typeof journeysTable.$inferInsert>,
) {
    const db = drizzle(SQLite, { schema });

    const [updatedJourney] = await db
        .update(journeysTable)
        .set(data)
        .where(eq(journeysTable.id, id))
        .returning();

    if (updatedJourney == null) {
        throw new Error("Failed to update journey");
    }

    return updatedJourney;
}

export async function deleteJourney(SQLite: SQLiteDatabase, id: number) {
    const db = drizzle(SQLite, { schema });

    const [deletedPackaging] = await db
        .delete(journeysTable)
        .where(eq(journeysTable.id, id))
        .returning();

    if (deletedPackaging == null) throw new Error("Failed to delete journey");

    return deletedPackaging;
}
