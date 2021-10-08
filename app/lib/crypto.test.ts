import { mnemonicToSeed } from "bip39";
import { DERIVATION_PATH, getKeypairFromSeed } from "./crypto";

const examples = [
  {
    wallet: "sollet",
    mnemonic:
      "agree narrow model crane tunnel upset left cost hospital drive sell pulse about curious barrel trigger black bike ramp hundred brief bone earth improve",
    publicKey: "GspwDcUwukxhHcj3zjKWBLsW9QJegajs2n9U6Atonz83",
    accountIndex: 0,
  },
  {
    wallet: "phantom",
    mnemonic:
      "end chimney lumber waste come sand act flock alley crime axis pledge",
    publicKey: "BWEXqueud7iFv9z1fVJ8gD4MBQY7EBz8FRReC6Rvhx3W",
    accountIndex: 0,
  },
  {
    wallet: "phantom 2",
    mnemonic:
      "end chimney lumber waste come sand act flock alley crime axis pledge",
    publicKey: "R3GGCC3FVu9oaGycz6JunAxyDnKmcKeMnC92dKqmBbh",
    accountIndex: 1,
  },
  {
    wallet: "phantom 3",
    mnemonic:
      "end chimney lumber waste come sand act flock alley crime axis pledge",
    publicKey: "98bHEQty5wKos44sCkdma9TKBsZyZ21LJxkSe6Q2fP21",
    accountIndex: 2,
  },
];

examples.forEach(({ wallet, mnemonic, publicKey, accountIndex }) => {
  test(wallet, async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const keypair = getKeypairFromSeed(
      seed,
      accountIndex,
      DERIVATION_PATH.bip44Change
    );

    expect(keypair.publicKey.toBase58()).toEqual(publicKey);
  });
});
