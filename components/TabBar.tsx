import { twColors } from "@/constants/Colors";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={styles.wrapper}>
            <View style={[styles.container, { marginBottom: insets.bottom }]}>
                {state.routes.map((route, index) => (
                    <TabBarButton
                        route={route}
                        index={index}
                        descriptors={descriptors}
                        navigation={navigation}
                        state={state}
                        buildHref={buildHref}
                        key={route.name}
                    />
                ))}
            </View>
        </View>
    );
}

function TabBarButton({
    route,
    index,
    descriptors,
    navigation,
    state,
    buildHref,
}: any) {
    const { options } = descriptors[route.key];

    const icon = options.tabBarIcon !== undefined ? options.tabBarIcon : null;

    const isFocused = state.index === index;
    const color = isFocused
        ? options.tabBarActiveTintColor
        : options.tabBarInactiveTintColor;

    const onPress = () => {
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: "tabLongPress",
            target: route.key,
        });
    };

    return (
        <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
            key={route.name}
        >
            {icon && icon({ focused: isFocused, color: color })}
        </PlatformPressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: twColors.slate[800],
    },
    container: {
        flexDirection: "row",
        height: 52,
    },
    button: {
        flex: 1,
    },
});
