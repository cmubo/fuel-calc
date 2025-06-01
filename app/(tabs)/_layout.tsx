import TabBar from "@/components/TabBar";
import TabIcon from "@/components/TabIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
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
                                    icon={
                                        <TabBarIcon name="home" color={color} />
                                    }
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
                                    icon={
                                        <TabBarIcon name="road" color={color} />
                                    }
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
                                    icon={
                                        <TabBarIcon name="cog" color={color} />
                                    }
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
