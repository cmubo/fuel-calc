import { StepsType } from "../types";

export const STEPS: StepsType = {
    0: {
        name: "mpg",
        label: "MPG",
        field: "mpg",
    },
    1: {
        name: "pricePerLitre",
        label: "Price Per Litre",
        field: "pricePerLitre",
    },
    2: {
        name: "distanceInMiles",
        label: "Distance",
        field: "distanceInMiles",
    },
    3: { name: "splitBetween", label: "Split Between", field: "splitBetween" },
    4: {
        name: "result",
        label: null,
        field: null,
    },
    5: {
        name: "dateOfJourney",
        label: "Date of Journey",
        field: "dateOfJourney",
        formatValue: (value: string) =>
            new Date(value).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
    },
    6: {
        name: "title",
        label: "Title",
        field: "title",
    },
    7: {
        name: "saved",
        label: null,
        field: null,
    },
};
