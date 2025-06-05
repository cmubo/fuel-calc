import { Ref } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
} from "react-native";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
    defaultValue?: string;
    ref?: Ref<RNTextInput>;
}

export default function TextInput(props: TextInputProps) {
    const { name, rules, defaultValue, ...inputProps } = props;
    const { field } = useController({ name, rules, defaultValue });

    return (
        <RNTextInput
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            {...inputProps}
        />
    );
}
