import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, incrementingId, updatedAt } from "../schemaHelpers";

export const fuelPricesTable = sqliteTable("fuel_prices", {
    id: incrementingId,
    name: text("name").notNull(),
    price: real("price").notNull(),
    createdAt,
    updatedAt,
});
