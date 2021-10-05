import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native
const Browser = () => {
  const runFirst = `
      alert("Hello world");
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://mango.markets",
        }}
        onMessage={(_event) => {}}
        injectedJavaScript={runFirst}
        style={{ marginTop: 100, backgroundColor: "black" }}
      />
    </View>
  );
};

export default Browser;
