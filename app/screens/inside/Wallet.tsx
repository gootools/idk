import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "../../lib/tailwind";
import store from "../../models";

const Wallet = observer(() => {
  useEffect(() => {
    store.activeWallet?.getBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl text-white font-bold`}>
        {store.activeWallet?.formattedBalance ?? "loading"}
      </Text>
    </View>
  );
});

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
