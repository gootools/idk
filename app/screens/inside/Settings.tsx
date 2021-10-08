import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooButton } from "../../components/GooButton";
import store from "../../models";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <GooButton
        onPress={() => alert(store.wallets[0].mnemonic)}
        text="Export recovery phrase"
      />
      <GooButton onPress={store.signout} text="Sign out" color="red-500" />
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
    padding: 15,
  },
});
