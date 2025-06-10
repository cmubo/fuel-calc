import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import RNDatePicker, {
    DatePickerProps as RNDatePickerProps,
} from "react-native-date-picker";

interface DatePickerProps
    extends Omit<RNDatePickerProps, "date" | "open" | "setOpen"> {
    name: string;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DatePicker({
    name,
    open,
    setOpen,
    ...props
}: DatePickerProps) {
    const { field } = useController({ name });
    const [date, setDate] = useState(new Date(field.value));

    const onSelectCallback = useCallback((value: Date) => {
        setDate(value);
        field.onChange(value.toISOString().split("T")[0]);

        setOpen ? setOpen(false) : null;
    }, []);

    return (
        <>
            <RNDatePicker
                date={date}
                mode="date"
                onDateChange={onSelectCallback}
                onConfirm={onSelectCallback}
                onCancel={() => (setOpen ? setOpen(false) : null)}
                open={open}
                {...props}
            />
        </>
    );
}
