import axios from "axios";
import { connection } from "../solana";
import { findMetadataAccount } from "./common";
import decodeMetadata from "./decodeMetadata";

const getMultipleMetadata = async (tokens: any[]) => {
  try {
    const mints = tokens
      .map((token: any) => token?.account?.data?.parsed?.info?.mint)
      .filter(Boolean);

    const pks: any[] = [];
    for (const mint of mints) {
      const [pk] = await findMetadataAccount(mint);
      pks.push(pk);
    }

    const responses = await connection.getMultipleAccountsInfo(pks);

    return (
      await Promise.all(
        responses
          .filter((r) => r?.data)
          .map(
            (response) =>
              new Promise(async (res) => {
                try {
                  const metadata = decodeMetadata(response!.data);
                  const { data: nftData } = await axios.get(metadata.data.uri);
                  res(nftData);
                } catch (err) {}
              })
          )
      )
    ).filter(Boolean);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getMultipleMetadata;
