import TabBar from "@/components/TabBar";
import TabIcon from "@/components/TabIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CalculatorScreen from ".";
import JourneysScreen from "./journeys";
import SettingsScreen from "./settings";

const Tab = createBottomTabNavigator();

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="index"
                component={CalculatorScreen}
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
            <Tab.Screen
                name="journeys"
                component={JourneysScreen}
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

            <Tab.Screen
                name="settings"
                component={SettingsScreen}
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
        </Tab.Navigator>
    );
}
