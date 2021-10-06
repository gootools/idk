import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GooPubkeyInput from "../../components/GooPubkeyInput";
import tw from "../../lib/tailwind";
import store from "../../models";

const SingleWallet: React.FC<any> = observer(({ navigation }) => {
  useEffect(() => {
    store.activeWallet?.getBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl text-white font-bold`}>
        {store.activeWallet?.formattedBalance ?? "loading"}
      </Text>
      <ScrollView style={{ height: 200 }}>
        {store.activeWallet?.nfts.map((n) => (
          <Image
            key={n.image}
            source={{ uri: n.image }}
            style={{ width: 100, height: 100 }}
          />
        ))}
      </ScrollView>
      <View>
        <FlatList
          keyExtractor={({ pubkey }) => pubkey}
          data={store.wallets}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={tw`text-white`}>{item.pubkey}</Text>
                <Text style={tw`text-red-400`}>{item.balance}</Text>
              </>
            );
          }}
        />
      </View>
      <Button
        title="Add wallet"
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
    <Stack.Screen name="SingleWallet" component={SingleWallet} />
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
    padding: 15,
  },
});
