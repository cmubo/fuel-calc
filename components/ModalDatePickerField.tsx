import { useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { Pressable } from "react-native";
import DatePicker from "./DatePicker";
import { GroteskText } from "./StyledText";

type StyleRecord = Record<string, string | number>;

export default function ModalDatePickerField({
    name,
    buttonStyles,
    buttonClassName,
}: {
    name: string;
    buttonStyles?: StyleRecord[] | StyleRecord;
    buttonClassName?: string;
}) {
    const { field } = useController({ name });
    const [datepickerModalOpen, setDatepickerModalOpen] = useState(false);

    const formattedDate = useMemo(() => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };

        return new Date(field.value).toLocaleDateString("default", options);
    }, [field.value]);

    return (
        <>
            <Pressable
                onPress={() => {
                    setDatepickerModalOpen(true);
                }}
                style={buttonStyles}
                className={buttonClassName}
            >
                <GroteskText>{formattedDate}</GroteskText>
            </Pressable>

            <DatePicker
                name={name}
                modal
                open={datepickerModalOpen}
                setOpen={setDatepickerModalOpen}
            />
        </>
    );
}
