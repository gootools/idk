import React, { useEffect, useLayoutEffect } from "react";
import { Button, Platform, StyleSheet, TextInput, View } from "react-native";

export default function RPC() {
  const [text, setText] = React.useState("");

  useEffect(() => {
    if (Platform.OS !== "web") return;
    chrome?.storage?.local?.get("url", (data: any) => {
      setText(data["url"] ?? "");
    });
  }, []);

  useLayoutEffect(() => {
    if (Platform.OS !== "web") return;
    const body = document?.querySelector("body");
    if (body) {
      body.style.width = "320px";
      body.style.height = "568px";
      body.style.backgroundColor = "black";
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setText} value={text} />
      <Button
        onPress={() => {
          if (Platform.OS !== "web") return;
          chrome?.storage?.local?.set({ url: text });
          chrome?.runtime?.reload();
        }}
        title="Save"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
