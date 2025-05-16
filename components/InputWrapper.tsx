import { Text, View } from "react-native";

export default function InputWrapper({
    children,
    label,
    errors,
    errorMessage,
}: {
    children: React.ReactNode;
    label: string;
    errors: any;
    errorMessage?: string;
}) {
    return (
        <View className="flex gap-2">
            <Text className="text-white text-lg">{label}</Text>

            {children}

            {errors && (
                <Text className="text-white">
                    {errorMessage ? errorMessage : errors.message}
                </Text>
            )}
        </View>
    );
}
