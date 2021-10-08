import { PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { destroy, types } from "mobx-state-tree";
import Account from "./Account";

const Wallet = types
  .model("Wallet", {
    mnemonic: types.string,
    passcode: "1234",
    accounts: types.array(Account),
  })
  .views((self) => ({
    get seed() {
      return mnemonicToSeedSync(self.mnemonic);
    },
  }))
  .actions((self) => ({
    afterCreate() {},
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
  }));

export default Wallet;
