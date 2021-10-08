if (
  require("react-native").Platform.OS !== "web" &&
  process?.env?.NODE_ENV !== "test"
) {
  require("react-native-url-polyfill/auto");
  // const { polyfill } = require("react-native-polyfill-globals");
  // polyfill();
  (global.process as any).version = "v14.17.5";
  global.Buffer = require("buffer").Buffer;
}

import {
  clusterApiUrl,
  Connection,
  PublicKey as _PublicKey,
} from "@solana/web3.js";

export const PublicKey = _PublicKey;

export const connection = new Connection(clusterApiUrl("mainnet-beta"));

export const getTokens = async (pubkey: _PublicKey) => {
  const { value: tokens } = await connection.getParsedTokenAccountsByOwner(
    pubkey,
    {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    }
  );
  return tokens.filter(
    (t) => t.account?.data?.parsed?.info?.tokenAmount?.uiAmount > 0
  );
};
