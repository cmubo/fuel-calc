import { JourneyRawFormValues } from "@/features/journeys/hooks/useJourneyForm";

export type PreviousFormValueType = {
    name: string;
    label: string;
    value: string;
};

export type StepsType = Record<
    string,
    { label: string | null; field: keyof JourneyRawFormValues | null }
>;
