import { GroteskText } from "@/components/StyledText";
import HeroIcon from "@/components/icons/HeroIcon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    FadeInRight,
    FadeInUp,
    FadeOutLeft,
    FadeOutUp,
} from "react-native-reanimated";
import { STEPS } from "./constants";
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
    const currentStep = STEPS[index.toString()];

    return (
        <View style={styles.headerContainer}>
            {index === 0 ? (
                <Animated.View
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                    style={{ paddingRight: 8, paddingBottom: 8 }}
                >
                    <GroteskText style={{ lineHeight: 30 }}>
                        Lets Get Started
                    </GroteskText>
                </Animated.View>
            ) : null}

            {index !== 0 && currentStep.name !== "saved" ? (
                <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
                    <TouchableOpacity
                        onPress={() => handleNavigation("back")}
                        style={{ paddingRight: 8, paddingBottom: 8 }}
                    >
                        <HeroIcon
                            icon="arrow-long-left"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                </Animated.View>
            ) : null}

            <View style={styles.previousResultsContainer}>
                {previousValues.map((prev, i) => (
                    <Animated.View
                        key={prev.name}
                        entering={FadeInUp}
                        exiting={FadeOutUp}
                    >
                        <GroteskText style={styles.previousResultsText}>
                            {prev.label}: {prev.value}
                        </GroteskText>
                    </Animated.View>
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
