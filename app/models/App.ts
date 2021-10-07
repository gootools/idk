import { PublicKey } from "@solana/web3.js";
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
      return await Promise.all(self.wallets.map((w) => w.getBalance()));
    },
    get totalBalance() {
      return (
        self.wallets.reduce((acc, curr) => acc + (curr.balance ?? 0), 0) /
        10 ** 9
      );
    },
  }))
  .actions((self) => ({
    addWallet(pubkey: string) {
      return new Promise((res, rej) => {
        try {
          new PublicKey(pubkey);
          const wallet = Wallet.create({ pubkey });
          self.wallets.push(wallet);
          res(wallet);
        } catch (err) {
          rej("invalid pubkey");
        }
      });
    },
    signout() {
      while (self.wallets.length > 0) {
        destroy(self.wallets.pop());
      }
    },
  }));

export default App;
