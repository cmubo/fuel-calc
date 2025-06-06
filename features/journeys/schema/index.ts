import { z } from "zod";

// This should stop at number and allow any more to be chained
const stringNumberUnion = (fieldName: string) => {
    return z.union([z.string(), z.number()]).pipe(
        z.coerce
            .number({
                invalid_type_error: `${fieldName} should be a number`,
            })
            .positive({
                message: `${fieldName} must be a positive number`,
            }),
    );
};

export const journeySchema = z.object({
    title: z.string(),
    mpg: stringNumberUnion("Miles per gallon"),
    pricePerLitre: stringNumberUnion("Price per litre"),
    distanceInMiles: stringNumberUnion("Distance in miles"),
    splitBetween: stringNumberUnion("Split between"),
});
