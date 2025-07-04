import HeroIcon from "@/components/icons/HeroIcon";
import TabBar from "@/components/TabBar";
import TabIcon from "@/components/TabIcon";
import { twColors } from "@/constants/Colors";
import { HeroIconPathType } from "@/constants/HeroIcons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { icon: HeroIconPathType; color: string }) {
    return <HeroIcon size={28} {...props} />;
}

export default function TabLayout() {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <Tabs
                    tabBar={(props) => <TabBar {...props} />}
                    screenOptions={{
                        sceneStyle: {
                            backgroundColor: twColors.slate[900],
                        },
                        headerShown: false,
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "white",
                        animation: "shift",
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
                                    icon={
                                        <TabBarIcon
                                            icon="calculator"
                                            color={color}
                                        />
                                    }
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
                                    icon={
                                        <TabBarIcon
                                            icon="archive-box"
                                            color={color}
                                        />
                                    }
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
                                    icon={
                                        <TabBarIcon
                                            icon="adjustments-horizontal"
                                            color={color}
                                        />
                                    }
                                />
                            ),
                        }}
                    />
                </Tabs>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
