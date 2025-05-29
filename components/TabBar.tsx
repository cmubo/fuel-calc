import { twColors } from "@/constants/Colors";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: types here
export default function TabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={styles.wrapper}>
            <View
                style={[styles.container, { marginBottom: insets.bottom + 10 }]}
            >
                {/* TODO: types here */}
                {state.routes.map((route: any, index: number) => (
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
            style={{ flex: 1 }}
            key={route.name}
        >
            {icon && icon({ focused: isFocused, color: color })}
        </PlatformPressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        overflow: "hidden",
        bottom: 0,
        width: "100%",
        left: 0,
    },
    container: {
        flexDirection: "row",
        backgroundColor: twColors.slate[900],
        borderRadius: 10,
        marginHorizontal: 20,
        height: 52,
        borderWidth: 0,
    },
});
