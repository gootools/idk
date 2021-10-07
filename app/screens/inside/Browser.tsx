import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import tw from "../../lib/tailwind";

const sites = [
  // "https://goo.tools",
  "https://psyoptions.io",
  "https://trade.mango.markets",
  "https://www.projectserum.com",
  "https://step.finance",
  "https://magiceden.io",
  "https://app.synthetify.io",
  "https://zeta.markets",
  "https://digitaleyes.market",
  // "https://solsea.io",
  "https://solend.fi",
  // "https://pyth.network",
  // "https://wormholebridge.com",
  // "https://hxro.io",
  // "https://marinade.finance",
  "https://orca.so",
];

// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native
const Browser = () => {
  const [uri, setUri] = useState("https://trade.mango.markets");
  const [url, setUrl] = useState(uri);

  const runFirst = `
      // alert("Hello world");
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <ScrollView style={{ height: 0 }}>
        {sites.map((site) => (
          <Image
            key={site}
            source={{
              uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${site}`,
            }}
            style={{ width: 32, height: 32 }}
          />
        ))}
      </ScrollView>
      <WebView
        originWhitelist={["https://*"]}
        source={{
          uri,
          // html: `<script>alert(navigator.serviceWorker)</script>`,
        }}
        onNavigationStateChange={(navState) => {
          // Keep track of going back navigation within component
          // this.canGoBack = navState.canGoBack;
          setUrl(navState.url);
        }}
        onMessage={(_event) => {}}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        style={{ backgroundColor: "black" }}
      />
      <View style={tw`p-4 bg-gray-800`}>
        <TextInput
          style={tw`bg-white py-3 px-2 w-full shadow-sm rounded-md`}
          placeholder="https://goo.tools"
          value={url}
          autoCorrect={false}
          keyboardType="url"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Browser;
