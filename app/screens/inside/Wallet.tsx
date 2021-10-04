import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "../../models";

const Wallet = observer(() => {
  const [balance, setBalance] = useState<number>();
  useEffect(() => {
    store.wallets[0].getBalance();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {store.wallets[0].formattedBalance ?? "loading"}
      </Text>
    </View>
  );
});

export default Wallet;

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
