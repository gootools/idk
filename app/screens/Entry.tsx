import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import store from "../models";

export default function Entry() {
  const [pubkey, setPubkey] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your wallet address below to begin</Text>
      {!isValid && <Text style={{ color: "red" }}>Invalid pubkey</Text>}
      <TextInput style={styles.input} onChangeText={setPubkey} value={pubkey} />
      <Button
        onPress={() => {
          setIsValid(true);

          store
            .addWallet(pubkey)
            .then(() => console.log("valid"))
            .catch(() => setIsValid(false));
        }}
        title="Go"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
  },
});
