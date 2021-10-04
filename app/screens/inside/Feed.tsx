import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
