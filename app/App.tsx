import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React from "react";
import useBrowserExtension from "./lib/hooks/useBrowserExtension";
import store from "./models";
import Entry from "./screens/Entry";
import RPC from "./screens/RPC";

const Inner = observer(() => (store.hasWallet ? <RPC /> : <Entry />));

export default function App() {
  useBrowserExtension();
  return (
    <>
      <Inner />
      <StatusBar style="light" />
    </>
  );
}
