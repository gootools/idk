require("react-native-url-polyfill/auto");

import { clusterApiUrl, Connection } from "@solana/web3.js";
export { PublicKey } from "@solana/web3.js";

export const connection = new Connection(clusterApiUrl("mainnet-beta"));