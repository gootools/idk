import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useBrowserExtension from "./lib/hooks/useBrowserExtension";
import Entry from "./screens/Entry";
import RPC from "./screens/RPC";

const Stack = createNativeStackNavigator();

export default function App() {
  useBrowserExtension();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="RPC" component={RPC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
