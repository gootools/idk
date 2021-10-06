import { flow } from "mobx";
import { types } from "mobx-state-tree";
import getMultipleMetadata from "../lib/metaplex/getMultipleMetadata";
import { connection, getTokens, PublicKey } from "../lib/solana";

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
  }))
  .actions((self) => ({
    getBalance: flow(function* () {
      self.setBalance(yield connection.getBalance(self._pubkey));

      const tokens = yield getTokens(self._pubkey);

      const metas = yield getMultipleMetadata(tokens);

      console.log({ metas, tokens });
    }),
  }));

export default Wallet;
