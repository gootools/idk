import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { Buffer } from "buffer";
import decodeMetadata from "./decodeMetadata";

// https://gist.github.com/creativedrewy/9bce794ff278aae23b64e6dc8f10e906

const RPC_URL = clusterApiUrl("mainnet-beta");

const metadataBuffer = Buffer.from("metadata");
const metadataKey = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const getMetadata = async (mintAddress: string) => {
  try {
    const [pk] = await PublicKey.findProgramAddress(
      [
        metadataBuffer,
        metadataKey.toBuffer(),
        new PublicKey(mintAddress).toBuffer(),
      ],
      metadataKey
    );

    const key = pk.toBase58();

    const response = await axios.post<any>(RPC_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "getAccountInfo",
      params: [
        key,
        {
          encoding: "base64",
        },
      ],
    });

    const [x, y] = response.data.result.value.data;

    const metadata = decodeMetadata(Buffer.from(x, y));

    const { data: nftData } = await axios.get(metadata.data.uri);

    return nftData;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export default getMetadata;
