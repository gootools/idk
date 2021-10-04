import { PublicKey } from "@solana/web3.js";
import { types } from "mobx-state-tree";
import Wallet from "./Wallet";

const App = types
  .model("App", {
    wallets: types.array(Wallet),
  })
  .views((self) => ({
    get hasWallet() {
      return self.wallets.length > 0;
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
  }));

export default App;
