import AsyncStorage from "@react-native-async-storage/async-storage";
import persist from "mst-persist";
import App from "./App";

const store = App.create();

persist("app", store, {
  storage: AsyncStorage,
  jsonify: true,
  // whitelist: ['name']
});

export default store;
