import { Tabs } from "expo-router";
import { Clock, List, Shuffle } from "lucide-react-native";
import React from "react";
import { theme } from "../../theme/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.neutrals.white,
          borderTopColor: theme.colors.neutrals.gray200,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.neutrals.gray500,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Decide",
          tabBarIcon: ({ focused, color, size }) => (
            <Shuffle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="choices"
        options={{
          title: "Choices",
          tabBarIcon: ({ focused, color, size }) => (
            <List size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused, color, size }) => (
            <Clock size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}