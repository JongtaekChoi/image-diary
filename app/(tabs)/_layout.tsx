import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useTheme } from "@emotion/react";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "오늘의 일기",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="notebook" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "캘린더",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
