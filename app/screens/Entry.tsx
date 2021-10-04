import React from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import tw from "../lib/tailwind";
import store from "../models";

export default function Entry() {
  const [pubkey, setPubkey] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  const handleSubmit = () => {
    setIsValid(true);

    store
      .addWallet(pubkey)
      .then(() => console.log("valid"))
      .catch(() => setIsValid(false));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={tw`text-lg text-white font-medium`}>
        Enter your address below to begin
      </Text>
      {!isValid && <Text style={{ color: "red" }}>Invalid pubkey</Text>}
      <TextInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        autoFocus
        keyboardType="ascii-capable"
        onChangeText={setPubkey}
        onSubmitEditing={handleSubmit}
        placeholder="Abcdefg0123456789abCDEFgh0123456789ABcdefgh1"
        style={styles.input}
        value={pubkey}
      />
      <Button onPress={handleSubmit} title="Go" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
