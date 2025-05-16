import { z } from "zod";

export const fuelPriceSchema = z.object({
    name: z.string().min(1),
    // Price is a number type but forms values are  strings so we accept string values as well and coerce into a number
    price: z
        .union([z.string(), z.number()])
        .pipe(
            z.coerce
                .number({ invalid_type_error: "Price should be a number" })
                .positive({ message: "Price must be a positive number" }),
        ),
});
