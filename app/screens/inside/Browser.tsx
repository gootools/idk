import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { WebView } from "react-native-webview";
import tw from "../../lib/tailwind";

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native
const Browser = () => {
  const [uri, setUri] = useState("https://mango.markets");

  const runFirst = `
      alert("Hello world");
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <WebView
        source={{
          uri,
        }}
        onMessage={(_event) => {}}
        injectedJavaScript={runFirst}
        style={{ marginTop: 100, backgroundColor: "black" }}
      />
      <View style={tw`p-4 bg-gray-800`}>
        <TextInput
          style={tw`bg-white py-3 px-2 w-full shadow-sm rounded-md`}
          placeholder="https://goo.tools"
          value={uri}
          autoCorrect={false}
          keyboardType="url"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Browser;
