import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={20} {...props} />;
}

interface TabIconProps {
    focused: boolean;
    icon: React.ReactElement;
    title: string;
}

function TabIcon({ focused, icon, title }: TabIconProps) {
    return (
        <View
            className={`flex flex-col w-full  min-w-[112px] min-h-[52px] justify-center items-center rounded-full overflow-hidden mt-4 ${focused ? "bg-blue-500" : ""}`}
        >
            {icon}
            <Text className="text-white text-base font-semibold ml-2">
                {title}
            </Text>
        </View>
    );
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0d23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: insets.bottom,
                    paddingBottom: 0,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0f0d23",
                    bottom: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: "white",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Calculator",
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            focused={focused}
                            title="Calculator"
                            icon={<TabBarIcon name="home" color={color} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="journeys"
                options={{
                    title: "Journeys",
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            focused={focused}
                            title="Journeys"
                            icon={<TabBarIcon name="road" color={color} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            focused={focused}
                            title="Settings"
                            icon={<TabBarIcon name="cog" color={color} />}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
