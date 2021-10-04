import { types } from "mobx-state-tree";

const Wallet = types.model("Wallet", {
  pubkey: types.string,
});

export default Wallet;
