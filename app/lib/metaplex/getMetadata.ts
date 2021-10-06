import axios from "axios";
import { connection } from "../solana";
import { findMetadataAccount } from "./common";
import decodeMetadata from "./decodeMetadata";

const getMetadata = async (mintAddress: string) => {
  try {
    const [pk] = await findMetadataAccount(mintAddress);

    const response = await connection.getAccountInfo(pk);

    const metadata = decodeMetadata(response!.data);

    const { data: nftData } = await axios.get(metadata.data.uri);

    return nftData;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export default getMetadata;
