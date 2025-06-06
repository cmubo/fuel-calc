import QueryLoadingAndErrorState from "@/components/QueryLoadingAndErrorState";
import CalculatorWizard from "@/features/calculator-wizard";
import { getDefaultFuelPrice } from "@/features/fuel-prices/db";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

export default function CalculatorScreen() {
    const sqliteContext = useSQLiteContext();

    const {
        data: defaultFuelPrice,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["defaultFuelPrice"],
        queryFn: getDefaultFuelPrice.bind(null, sqliteContext),
    });

    if (isPending || isError) {
        return <QueryLoadingAndErrorState {...{ isPending, isError }} />;
    }

    return <CalculatorWizard defaultFuelPrice={defaultFuelPrice[0].price} />;
}
