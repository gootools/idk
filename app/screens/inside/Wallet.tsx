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
import HeaderDropdown from "../../components/HeaderDropdown";
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
      <ScrollView style={tw`flex p-4`}>
        {store.activeWallet?.nfts.map((n) => (
          <Image
            key={n.image}
            source={{ uri: n.image }}
            style={tw`rounded h-[200px] w-[200px] m-2`}
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

const AllWallets: React.FC<any> = observer(({ navigation }) => {
  useEffect(() => {
    store.getBalance().then(() => console.log({ w: store.wallets }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl text-white font-bold`}>
        Total: {store.totalBalance} SOL
      </Text>
      <ScrollView>
        {store.wallets.map((wallet, i) => (
          <>
            <Text style={tw`text-xl text-white font-bold`}>
              {i + 1}) {`${wallet.formattedBalance} SOL` ?? "loading"}
            </Text>
            <View style={tw`flex p-4`}>
              {wallet.nfts.map((n) => (
                <View
                  key={n.image}
                  style={{
                    position: "relative",
                    width: 170,
                    height: 170,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: n.image }}
                    style={tw`rounded h-full w-full`}
                  />
                  {n.isWumbo && (
                    <Image
                      source={{
                        uri: "https://pbs.twimg.com/profile_images/1398129901702688769/3GQuUoUq_400x400.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </>
        ))}
      </ScrollView>
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
