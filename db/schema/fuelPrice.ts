import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const fuelPrices = sqliteTable("fuel_prices", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    price: real("price").notNull(),
});
