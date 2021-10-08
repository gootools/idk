import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { utils } from "ethers";
import { getRandomBytes } from "expo-random";
import { sign } from "tweetnacl";

export const generateMnemonic = () => {
  const randomBytes = getRandomBytes(32);
  const mnemonic = utils.entropyToMnemonic(randomBytes);
  return mnemonic;
};

export enum DERIVATION_PATH {
  bip44,
  bip44Change,
  bip44Root, // Ledger only.
}

export function getKeypairFromSeed(
  seed: string,
  walletIndex: number,
  dPath: DERIVATION_PATH
) {
  const derivedSeed = deriveSeed(seed, walletIndex, dPath);
  return Keypair.fromSecretKey(sign.keyPair.fromSeed(derivedSeed).secretKey);
}

function deriveSeed(seed: string, walletIndex: number, derivationPath: any) {
  switch (derivationPath) {
    // By default, sollet will use m/44'/501'/0'/0' as the derivation path
    case DERIVATION_PATH.bip44:
      const path44 = `m/44'/501'/${walletIndex}'`;
      return derivePath(path44, seed).key;
    case DERIVATION_PATH.bip44Change:
      const path44Change = `m/44'/501'/${walletIndex}'/0'`;
      return derivePath(path44Change, seed).key;
    default:
      throw new Error(`invalid derivation path: ${derivationPath}`);
  }
}
