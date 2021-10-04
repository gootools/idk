import { flow } from "mobx";
import { types } from "mobx-state-tree";
import { connection, PublicKey } from "../lib/solana";

const Wallet = types
  .model("Wallet", {
    pubkey: types.string,
    balance: types.maybe(types.number),
  })
  .views((self) => ({
    get _pubkey() {
      return new PublicKey(self.pubkey);
    },
    get formattedBalance() {
      return self.balance ? self.balance / 10 ** 9 : undefined;
    },
  }))
  .actions((self) => ({
    setBalance(balance: number) {
      self.balance = balance;
    },
    getBalance: flow(function* () {
      (self as any).setBalance(yield connection.getBalance(self._pubkey));
    }),
  }));

export default Wallet;
