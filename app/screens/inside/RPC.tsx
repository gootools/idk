import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import tw from "../../lib/tailwind";
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
      <Text style={tw`text-lg text-white font-bold mb-4`}>
        Enter a custom RPC address below to use that instead
      </Text>
      <TextInput
        style={tw`bg-white py-3 px-2 block w-full shadow-sm rounded-md mb-4`}
        onChangeText={setText}
        value={text}
        placeholder="https://custom-rpc.example.com"
      />
      {/* <Button
        onPress={() => {
          if (Platform.OS !== "web") return;
          chrome?.storage?.local?.set({ url: text });
          chrome?.runtime?.reload();
        }}
        title="Save"
      /> */}
      <Switch
        trackColor={{ false: "#767577", true: "#1DF1D8" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#D720C6"}
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
    padding: 15,
    backgroundColor: "#444",
  },
});
