import { types } from "mobx-state-tree";
import Wallet from "./Wallet";

const App = types.model("App", {
  wallets: types.array(Wallet),
});

export default App;
