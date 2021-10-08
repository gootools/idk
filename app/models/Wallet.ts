import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { destroy, types } from "mobx-state-tree";
import { DERIVATION_PATH, getKeypairFromSeed } from "../lib/crypto";
import Account from "./Account";

const Wallet = types
  .model("Wallet", {
    mnemonic: types.string,
    passcode: "1234",
    accounts: types.array(Account),
  })
  .views((self) => ({
    get seed() {
      const seed = mnemonicToSeedSync(self.mnemonic);
      const keypair = getKeypairFromSeed(seed, 0, DERIVATION_PATH.bip44);
      return keypair.publicKey.toBase58();
    },
    get balance() {
      return (
        self.accounts.reduce((acc, curr) => acc + (curr.balance ?? 0), 0) /
        LAMPORTS_PER_SOL
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
  }))
  .actions((self) => ({
    afterCreate() {
      if (self.accounts.length === 0) {
        // self.addAccount(1)
      }
    },
  }));

export default Wallet;
