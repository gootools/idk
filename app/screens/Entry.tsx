import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Entry() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your wallet address below to begin</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
