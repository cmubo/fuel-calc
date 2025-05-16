const reusableStyles = require("./constants/reusable-styles");

function getSafelistFromReusableStyles(reusableStyles) {
    const safeList = [];
    for (const value of Object.values(reusableStyles)) {
        safeList.push(...value.split(" "));
    }
    return safeList;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./features/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [...getSafelistFromReusableStyles(reusableStyles)],
};
