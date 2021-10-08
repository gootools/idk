import { destroy, types } from "mobx-state-tree";
import { Platform } from "react-native";
import Wallet from "./Wallet";

const App = types
  .model("App", {
    wallets: types.array(Wallet),
  })
  .views((self) => ({
    get isInside() {
      return self.wallets.length > 0;
    },
    get isBrowserExtension() {
      // https://stackoverflow.com/a/22563123
      return Boolean(Platform.OS === "web" && chrome?.runtime?.id);
    },
    get activeWallet() {
      return self.wallets.length > 0 ? self.wallets[0] : undefined;
    },
    async getBalance() {
      return await Promise.all(
        self.wallets.flatMap((w) => w.accounts.flatMap((a) => a.getBalance()))
      );
    },
    get totalBalance() {
      return 0;
      // return (
      //   self.wallets.accounts.reduce((acc, curr) => acc + (curr.balance ?? 0), 0) /
      //   10 ** 9
      // );
    },
  }))
  .actions((self) => ({
    addWallet(mnemonic: string) {
      self.wallets.push({ mnemonic });
    },
    signout() {
      while (self.wallets.length > 0) {
        destroy(self.wallets.pop());
      }
    },
  }));

export default App;
