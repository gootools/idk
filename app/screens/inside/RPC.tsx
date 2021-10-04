import React, { useEffect, useLayoutEffect } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from "react-native";
import store from "../../models";

export default function RPC() {
  const [text, setText] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);

  useEffect(() => {
    if (!store.isBrowserExtension) return;
    chrome?.storage?.local?.get("url", (data: any) => {
      setText(data["url"] ?? "");
    });
  }, [store.isBrowserExtension]);

  useLayoutEffect(() => {
    if (!store.isBrowserExtension) return;
    const body = document?.querySelector("body");
    if (body) {
      body.style.width = "320px";
      body.style.height = "568px";
      body.style.backgroundColor = "black";
    }
  }, [store.isBrowserExtension]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="https://custom-rpc.example.com"
      />
      <Button
        onPress={() => {
          if (Platform.OS !== "web") return;
          chrome?.storage?.local?.set({ url: text });
          chrome?.runtime?.reload();
        }}
        title="Save"
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          setIsEnabled(!isEnabled);

          if (store.isBrowserExtension) {
            chrome?.browserAction?.setIcon({
              path: {
                "128": isEnabled
                  ? "../assets/black.png"
                  : "../assets/green.png",
              },
            });
          }
        }}
        value={isEnabled}
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
