import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import "react-native-url-polyfill/auto";
import Polyfill from "react-native-webview-crypto";
import SharedApp from "./SharedApp";

const NativeApp: React.FC = () => (
  <Suspense fallback={null}>
    <Polyfill />
    <StatusBar style="light" />
    <SharedApp />
  </Suspense>
);

export default NativeApp;
