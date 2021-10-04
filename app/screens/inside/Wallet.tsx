import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
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
      <View>
        <FlatList
          keyExtractor={({ pubkey }) => pubkey}
          data={store.wallets}
          renderItem={({ item }) => {
            return <Text style={tw`text-white`}>{item.pubkey}</Text>;
          }}
        />
      </View>
      <Button title="Add wallet" onPress={console.log} />
    </View>
  );
});

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    display: "flex",
  },
});
