// TODO: unit tests for this file

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
export const DecimalPrecision2 = (function () {
    if (Number.EPSILON === undefined) {
        // @ts-ignore
        Number.EPSILON = Math.pow(2, -52);
    }
    if (Math.sign === undefined) {
        Math.sign = function (x: any) {
            return (x > 0) - (x < 0) || +x;
        };
    }
    return {
        // Decimal round (half away from zero)
        round: function (num: number, decimalPlaces: number) {
            var p = Math.pow(10, decimalPlaces || 0);
            var n = num * p * (1 + Number.EPSILON);
            return Math.round(n) / p;
        },
        // Decimal ceil
        ceil: function (num: number, decimalPlaces: number) {
            var p = Math.pow(10, decimalPlaces || 0);
            var n = num * p * (1 - Math.sign(num) * Number.EPSILON);
            return Math.ceil(n) / p;
        },
    };
})();

export function calculatePriceOfFuel(
    distance: number,
    pricePerLitre: number,
    mpg: number,
): number {
    const gallonsUsed = distance / mpg;
    const litresOfFuelUsed = gallonsUsed * 4.546;

    let cost = litresOfFuelUsed * pricePerLitre;

    return cost;
}
