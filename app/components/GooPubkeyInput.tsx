import React from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import store from "../models";

const GooPubkeyInput: React.FC<any> = ({ handleSubmit }) => {
  const [pubkey, setPubkey] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  const _handleSubmit = () => {
    setIsValid(true);

    store
      .addWallet(pubkey)
      .then(() => handleSubmit())
      .catch(() => setIsValid(false));
  };

  return (
    <>
      {!isValid && <Text style={{ color: "red" }}>Invalid pubkey</Text>}
      <TextInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        autoFocus
        keyboardType="ascii-capable"
        onChangeText={setPubkey}
        onSubmitEditing={_handleSubmit}
        placeholder="Abcdefg0123456789abCDEFgh0123456789ABcdefgh1"
        value={pubkey}
        style={styles.input}
      />
      <Button onPress={_handleSubmit} title="Go" />
    </>
  );
};

const styles = StyleSheet.create({
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

export default GooPubkeyInput;
