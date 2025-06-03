import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { GroteskTextMedium } from "./StyledText";

interface TabIconProps {
    focused: boolean;
    icon: React.ReactElement;
    title: string;
}

export default function TabIcon({ focused, icon, title }: TabIconProps) {
    const textOpacity = useSharedValue(0);
    const textScale = useSharedValue(0.75);
    const iconScale = useSharedValue(1);
    const iconTranslateY = useSharedValue(10);

    useEffect(() => {
        textOpacity.value = withTiming(focused ? 1 : 0, { duration: 200 });
        textScale.value = withTiming(focused ? 1 : 0.85, { duration: 200 });
        iconScale.value = withTiming(focused ? 0.85 : 1, { duration: 200 });
        iconTranslateY.value = withTiming(focused ? 2 : 10, { duration: 200 });
    }, [focused]);

    const animatedStyleText = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ scale: textScale.value }],
        };
    });
    const animatedStyleIcon = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: iconScale.value },
                { translateY: iconTranslateY.value },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[animatedStyleIcon]}>{icon}</Animated.View>

            <Animated.View style={[animatedStyleText]}>
                <GroteskTextMedium className="text-sm" style={styles.label}>
                    {title}
                </GroteskTextMedium>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    label: {
        color: "white",
        fontWeight: 600,
    },
});
