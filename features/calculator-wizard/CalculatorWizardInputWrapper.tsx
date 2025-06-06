import { GroteskText, GroteskTextMedium } from "@/components/StyledText";
import { StyleSheet, View } from "react-native";

export default function InputWrapper({
    children,
    label,
    subLabel,
    errors,
    errorMessage,
}: {
    children: React.ReactNode;
    label: string;
    subLabel?: string;
    errors: any;
    errorMessage?: string;
}) {
    return (
        <View>
            <View style={styles.inputLabelContainer}>
                <GroteskTextMedium style={styles.inputLabel}>
                    {label}
                </GroteskTextMedium>
                <GroteskText style={styles.inputLabelHelp}>
                    {subLabel}
                </GroteskText>
            </View>

            {children}

            {errors && (
                <GroteskTextMedium style={{ color: "red", marginTop: 8 }}>
                    {errorMessage ? errorMessage : errors.message}
                </GroteskTextMedium>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputLabelContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 24,
        color: "white",
    },
    inputLabelHelp: {
        fontSize: 12,
        color: "white",
    },
});
