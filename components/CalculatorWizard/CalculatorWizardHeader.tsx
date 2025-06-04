import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GroteskText } from "../StyledText";
import HeroIcon from "../icons/HeroIcon";
import { PreviousFormValueType } from "./types";

export default function CalculatorWizardHeader({
    handleNavigation,
    previousValues,
    index,
}: {
    handleNavigation: (direction: "forward" | "back") => void;
    previousValues: PreviousFormValueType[];
    index: number;
}) {
    return (
        <View style={styles.headerContainer}>
            {index === 0 ? (
                <View style={{ paddingRight: 8, paddingBottom: 8 }}>
                    <GroteskText>Lets Get Started</GroteskText>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => handleNavigation("back")}
                    style={{ paddingRight: 8, paddingBottom: 8 }}
                >
                    <HeroIcon icon="arrow-long-left" color="white" size={30} />
                </TouchableOpacity>
            )}

            <View style={styles.previousResultsContainer}>
                {previousValues.map((prev, i) => (
                    <View key={i}>
                        <GroteskText style={styles.previousResultsText}>
                            {prev.label}: {prev.value}
                        </GroteskText>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 24,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    previousResultsContainer: {
        alignItems: "flex-end",
        gap: 4,
    },
    previousResultsText: {
        textAlign: "right",
    },
});
