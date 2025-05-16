import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const incrementingId = integer("id").primaryKey({ autoIncrement: true });
export const createdAt = text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`);
export const updatedAt = text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`);
