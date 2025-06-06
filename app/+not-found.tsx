import { GroteskTextMedium } from "@/components/StyledText";
import { View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View style={styles.container}>
                <GroteskTextMedium style={styles.title}>
                    This screen doesn't exist.
                </GroteskTextMedium>

                <Link href="/" style={styles.link}>
                    <GroteskTextMedium style={styles.linkText}>
                        Go to home screen!
                    </GroteskTextMedium>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
});
