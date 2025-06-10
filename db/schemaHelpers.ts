import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const CURRENT_TIMESTAMP = sql`(datetime('now', 'localtime'))`;
export const incrementingId = integer("id").primaryKey({ autoIncrement: true });
export const createdAt = text("created_at")
    .notNull()
    .default(CURRENT_TIMESTAMP);
export const updatedAt = text("updated_at")
    .notNull()
    .default(CURRENT_TIMESTAMP)
    .$onUpdate(() => CURRENT_TIMESTAMP);
