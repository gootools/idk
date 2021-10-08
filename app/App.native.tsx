import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-url-polyfill/auto";
import SharedApp from "./SharedApp";

const NativeApp: React.FC = () => (
  <>
    <StatusBar style="light" />
    <SharedApp />
  </>
);

export default NativeApp;
