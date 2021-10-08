import { mnemonicToSeed } from "bip39";
import { entropyToMnemonic } from "ethers/lib.esm/utils";
import { getRandomBytesAsync } from "expo-random";
import React, { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import GooPubkeyInput from "../../components/GooPubkeyInput";
import tw from "../../lib/tailwind";
// import { generateMnemonic } from "../../lib/crypto";

export default function Entry() {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    (async () => {
      const mnemonic = entropyToMnemonic(await getRandomBytesAsync(32));
      const seed = await mnemonicToSeed(mnemonic);
      setPhrase(JSON.stringify({ mnemonic, seed }));

      // addWallet({
      //   passcode: "1234",
      //   mnemonic,
      //   seed
      // })
      //
      // addAccount({
      //   title: "first",
      //   derivationPath: "bip44Change"
      // })
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={tw`text-lg text-white font-medium`}>{phrase}</Text>
      <Button onPress={console.log} title="Create wallet" />

      <Text style={tw`text-lg text-white font-medium`}>
        Enter your address below to begin
      </Text>
      <GooPubkeyInput />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 15,
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
