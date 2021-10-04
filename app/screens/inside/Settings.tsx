import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooButton } from "../../components/GooButton";
import store from "../../models";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <GooButton onPress={store.signout} text="Sign out" />
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
