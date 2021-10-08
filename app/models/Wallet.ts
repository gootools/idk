import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { types } from "mobx-state-tree";
import { DERIVATION_PATH, getKeypairFromSeed } from "../lib/crypto";
import Account from "./Account";

const Wallet = types
  .model("Wallet", {
    mnemonic: types.string,
    passcode: "1234",
    accounts: types.array(Account),
    activeAccountIndex: 0,
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
    get activeAccount() {
      return self.accounts[self.activeAccountIndex];
    },
  }))
  .actions((self) => ({
    addAccount() {
      const seed = mnemonicToSeedSync(self.mnemonic);
      const keypair = getKeypairFromSeed(
        seed,
        self.accounts.length,
        DERIVATION_PATH.bip44Change
      );
      self.accounts.push({ pubkey: keypair.publicKey.toBase58() });
    },
  }))
  .actions((self) => ({
    afterCreate() {
      if (self.accounts.length === 0) {
        self.addAccount();
      }
    },
  }));

export default Wallet;
