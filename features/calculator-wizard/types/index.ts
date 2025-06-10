import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";

export type PreviousFormValueType = {
    name: string;
    label: string;
    value: string;
    formatValue?: (value: string) => string;
};

export type StepsType = Record<
    string,
    {
        name: string;
        label: string | null;
        field: keyof JourneyRawFormValues | null;
        formatValue?: (value: string) => string;
    }
>;
