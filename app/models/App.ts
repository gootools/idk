import { PublicKey } from "@solana/web3.js";
import { destroy, types } from "mobx-state-tree";
import { Platform } from "react-native";
import Account from "./Account";

const App = types
  .model("App", {
    accounts: types.array(Account),
  })
  .views((self) => ({
    get isInside() {
      return self.accounts.length > 0;
    },
    get isBrowserExtension() {
      // https://stackoverflow.com/a/22563123
      return Boolean(Platform.OS === "web" && chrome?.runtime?.id);
    },
    get activeWallet() {
      return self.accounts.length > 0 ? self.accounts[0] : undefined;
    },
    async getBalance() {
      return await Promise.all(self.accounts.map((w) => w.getBalance()));
    },
    get totalBalance() {
      return (
        self.accounts.reduce((acc, curr) => acc + (curr.balance ?? 0), 0) /
        10 ** 9
      );
    },
  }))
  .actions((self) => ({
    addAccount(pubkey: string) {
      return new Promise((res, rej) => {
        try {
          new PublicKey(pubkey);
          const account = Account.create({ pubkey });
          self.accounts.push(account);
          res(account);
        } catch (err) {
          rej("invalid pubkey");
        }
      });
    },
    removeAccount(pubkey: string) {
      const wallet = self.accounts.find((w) => w.pubkey === pubkey);
      if (wallet) {
        destroy(wallet);
      }
    },
    signout() {
      while (self.accounts.length > 0) {
        destroy(self.accounts.pop());
      }
    },
  }));

export default App;
