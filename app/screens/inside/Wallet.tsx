import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import GooPubkeyInput from "../../components/GooPubkeyInput";
import HeaderDropdown from "../../components/HeaderDropdown";
import tw from "../../lib/tailwind";
import store from "../../models";

const AllWallets: React.FC<any> = observer(({ navigation }) => {
  useEffect(() => {
    store.getBalance().then(() => console.log({ w: store.wallets }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl text-white font-bold`}>
        Total: {store.totalBalance} SOL
      </Text>

      <Button
        title="Add another wallet"
        onPress={() => navigation.navigate("AddWallet")}
      />
    </View>
  );
});

const AddWallet: React.FC<any> = ({ navigation }) => {
  return (
    <View>
      <Text>Add wallet</Text>
      <GooPubkeyInput
        handleSubmit={() => navigation.navigate("SingleWallet")}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Wrapper: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AllWallets"
      component={AllWallets}
      options={{ headerTitle: (props) => <HeaderDropdown {...props} /> }}
    />
    <Stack.Screen name="AddWallet" component={AddWallet} />
  </Stack.Navigator>
);

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    display: "flex",
  },
});
