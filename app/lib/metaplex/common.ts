import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

const metadataBuffer = Buffer.from("metadata");

const metadataKey = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const findMetadataAccount = (mintAddress: string) =>
  PublicKey.findProgramAddress(
    [
      metadataBuffer,
      metadataKey.toBuffer(),
      new PublicKey(mintAddress).toBuffer(),
    ],
    metadataKey
  );
