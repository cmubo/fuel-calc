import Animated from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import { withTiming } from "react-native-reanimated";
import { Text, View } from "react-native";

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
        <View
            className={`flex flex-col w-full  min-w-[112px] justify-center items-center overflow-hidden ${focused ? "bg-cyan-600" : ""}`}
            style={{
                borderRadius: 10,
                height: "100%",
            }}
        >
            <Animated.View style={[animatedStyleIcon]}>{icon}</Animated.View>

            <Animated.View style={[animatedStyleText]}>
                <Text className="text-cyan-100 text-sm font-semibold">
                    {title}
                </Text>
            </Animated.View>
        </View>
    );
}
