import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import useBrowserExtension from "./lib/hooks/useBrowserExtension";
import Entry from "./screens/Entry";
import RPC from "./screens/RPC";

const Tab = createBottomTabNavigator();

export default function App() {
  useBrowserExtension();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Entry" component={Entry} />
        {Platform.OS === "web" && <Tab.Screen name="RPC" component={RPC} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
