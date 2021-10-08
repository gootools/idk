import { utils } from "ethers";
import { getRandomBytes } from "expo-random";

export const generateMnemonic = () => {
  const randomBytes = getRandomBytes(32);
  const mnemonic = utils.entropyToMnemonic(randomBytes);
  return mnemonic;
};

// export const mnemonicToSeed = async (mnemonic: string) => {
//   const bip39 = await import("bip39");
//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   return Buffer.from(seed).toString("hex");
// };
