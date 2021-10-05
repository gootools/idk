import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import store from "../../models";
import Browser from "./Browser";
import Feed from "./Feed";
import RPC from "./RPC";
import Settings from "./Settings";
import Wallet from "./Wallet";

const Tab = createBottomTabNavigator();

export default function Inside() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const props = { size: 28, color: focused ? "#eee" : "#444" };
            switch (route.name) {
              case "Feed":
                return <Ionicons name="ios-notifications" {...props} />;
              case "Wallet":
                return <MaterialCommunityIcons name="cash-usd" {...props} />;
              case "Browser":
                return <Ionicons name="ios-browsers" {...props} />;
              case "Settings":
                return <Ionicons name="ios-settings" {...props} />;
              default:
                return (
                  <MaterialCommunityIcons name="lightning-bolt" {...props} />
                );
            }
          },
          headerShown: false,
          tabBarShowLabel: store.isBrowserExtension,
          tabBarStyle: {
            backgroundColor: "#111",
            borderTopWidth: 0,
          },
        })}
        initialRouteName="Wallet"
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Wallet" component={Wallet} />
        {Platform.OS === "web" && <Tab.Screen name="RPC" component={RPC} />}
        {Platform.OS !== "web" && (
          <Tab.Screen name="Browser" component={Browser} />
        )}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
