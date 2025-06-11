import {
    calculatePriceOfFuel,
    DecimalPrecision2,
    getGallonsOfFuelUsed,
    getLitresOfFuelUsedFromGallonsUsed,
    priceOfFuelToCurrency,
} from "../math";

describe("Math functions", () => {
    test("DecimalPrecision2 round function", () => {
        expect(DecimalPrecision2.round(1.001, 2)).toBe(1.0);
        expect(DecimalPrecision2.round(1.005, 2)).toBe(1.01);
        expect(DecimalPrecision2.round(1.009, 2)).toBe(1.01);
        expect(DecimalPrecision2.round(4241.424241, 2)).toBe(4241.42);
        expect(DecimalPrecision2.round(99.9999, 2)).toBe(100);
        expect(DecimalPrecision2.round(3434.3464, 2)).toBe(3434.35);
        expect(DecimalPrecision2.round(3434.3464, 3)).toBe(3434.346);
        expect(DecimalPrecision2.round(3434.3464, 1)).toBe(3434.3);
    });

    test("DecimalPrecision2 ceil function", () => {
        expect(DecimalPrecision2.ceil(1.001, 2)).toBe(1.01);
        expect(DecimalPrecision2.ceil(1.005, 2)).toBe(1.01);
        expect(DecimalPrecision2.ceil(1.002, 2)).toBe(1.01);
        expect(DecimalPrecision2.ceil(4241.424241, 2)).toBe(4241.43);
        expect(DecimalPrecision2.ceil(99.9999, 2)).toBe(100);
        expect(DecimalPrecision2.ceil(3434.3464, 2)).toBe(3434.35);
        expect(DecimalPrecision2.ceil(3434.3464, 3)).toBe(3434.347);
        expect(DecimalPrecision2.ceil(3434.3464, 1)).toBe(3434.4);
    });

    test("priceOfFuelToCurrency function", () => {
        expect(priceOfFuelToCurrency(11592)).toBe("115.92");
        expect(priceOfFuelToCurrency(115923)).toBe("1159.23");
        expect(priceOfFuelToCurrency(23)).toBe("0.23");
        expect(priceOfFuelToCurrency(248)).toBe("2.48");
        expect(priceOfFuelToCurrency(1000, 4)).toBe("2.50");
        expect(priceOfFuelToCurrency(99999, 4)).toBe("250.00");
        expect(priceOfFuelToCurrency(99999, 3)).toBe("333.33");
        expect(priceOfFuelToCurrency(99999, 1)).toBe("999.99");
    });

    test("calculatePriceOfFuel function", () => {
        expect(calculatePriceOfFuel(100, 127.5, 50)).toBe(1159.23);
        expect(calculatePriceOfFuel(200, 127.5, 50)).toBe(2318.46);
        expect(calculatePriceOfFuel(150, 135.23, 30)).toBe(3073.7779);
        expect(calculatePriceOfFuel(150.12, 127, 35.4)).toBe(
            2448.3214983050852,
        );
        expect(calculatePriceOfFuel(999.33, 127.5, 50)).toBe(11584.533159);
    });

    test("combination of calculatePriceOfFuel and priceOfFuelToCurrency", () => {
        const arrayOfCalcs: {
            answer: string;
            calc: [number, number, number];
            splitCostBy?: number;
        }[] = [
            { answer: "11.59", calc: [100, 127.5, 50] },
            {
                answer: "23.18",
                calc: [200, 127.5, 50],
            },
            { answer: "30.74", calc: [150, 135.23, 30] },
            { answer: "115.85", calc: [999.33, 127.5, 50] },
            { answer: "57.92", calc: [999.33, 127.5, 50], splitCostBy: 2 },
            { answer: "38.62", calc: [999.33, 127.5, 50], splitCostBy: 3 },
        ];

        arrayOfCalcs.forEach((calc) => {
            const answer = priceOfFuelToCurrency(
                calculatePriceOfFuel(...calc.calc),
                calc.splitCostBy ?? 1,
            );

            expect(answer).toBe(calc.answer);
        });
    });

    test("getLitresOfFuelUsedFromGallonsUsed function", () => {
        expect(getLitresOfFuelUsedFromGallonsUsed(1)).toBe(4.55);
        expect(getLitresOfFuelUsedFromGallonsUsed(2)).toBe(9.09);
        expect(getLitresOfFuelUsedFromGallonsUsed(3)).toBe(13.64);
        expect(getLitresOfFuelUsedFromGallonsUsed(4)).toBe(18.18);
    });

    test("getGallonsOfFuelUsed function", () => {
        expect(getGallonsOfFuelUsed(100, 50)).toBe(2);
        expect(getGallonsOfFuelUsed(200, 50)).toBe(4);
        expect(getGallonsOfFuelUsed(125, 43.2)).toBe(2.89);
        expect(getGallonsOfFuelUsed(543, 43.2)).toBe(12.57);
    });
});
