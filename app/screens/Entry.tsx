import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import GooPubkeyInput from "../components/GooPubkeyInput";
import tw from "../lib/tailwind";

export default function Entry() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={tw`text-lg text-white font-medium`}>
        Enter your address below to begin
      </Text>
      <GooPubkeyInput />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
  },
});
