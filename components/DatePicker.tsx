import React, { useState } from "react";
import { useController } from "react-hook-form";
import RNDatePicker, {
    DatePickerProps as RNDatePickerProps,
} from "react-native-date-picker";

interface DatePickerProps extends Omit<RNDatePickerProps, "date"> {
    name: string;
}

export default function DatePicker({ name, ...props }: DatePickerProps) {
    const { field } = useController({ name });
    const [date, setDate] = useState(new Date(field.value));

    return (
        <>
            <RNDatePicker
                date={date}
                mode="date"
                onDateChange={(date) => {
                    setDate(date);

                    field.onChange(date.toISOString().split("T")[0]);
                }}
                {...props}
            />
        </>
    );
}
