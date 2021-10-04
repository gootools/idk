import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  useLayoutEffect(() => {
    const body = document?.querySelector("body");
    if (body) {
      body.style.width = "320px";
      body.style.height = "568px";
      body.style.backgroundColor = "black";
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    // width: 500,
    // height: 500,
  },
});
