import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, incrementingId } from "../schemaHelpers";

export const journeysTable = sqliteTable("journeys", {
    id: incrementingId,
    title: text("title").notNull(),
    mpg: real("mpg").notNull(),
    pricePerLitre: real("price_per_litre").notNull(),
    distanceInMiles: real("distance_in_miles").notNull(),
    splitBetween: real("split_between").notNull(),
    price: real("price").notNull(),
    createdAt,
});
