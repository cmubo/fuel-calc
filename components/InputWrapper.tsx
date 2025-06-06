import { View } from "react-native";
import { GroteskTextMedium } from "./StyledText";

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
        <View className="flex-1 gap-2">
            <GroteskTextMedium className="text-white text-lg">
                {label}
            </GroteskTextMedium>

            {children}

            {errors && (
                <GroteskTextMedium className="text-white">
                    {errorMessage ? errorMessage : errors.message}
                </GroteskTextMedium>
            )}
        </View>
    );
}
