import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import Feed from "./Feed";
import RPC from "./RPC";
import Settings from "./Settings";
import Wallet from "./Wallet";

const Tab = createBottomTabNavigator();

export default function Inside() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Wallet" component={Wallet} />
        {Platform.OS === "web" && <Tab.Screen name="RPC" component={RPC} />}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
