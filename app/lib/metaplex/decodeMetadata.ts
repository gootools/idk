import { PublicKey } from "@solana/web3.js";
import { BinaryReader, deserializeUnchecked } from "borsh";
import base58 from "bs58";

const extendBorsh = () => {
  const proto = BinaryReader.prototype as any;

  proto.readPubkey = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  proto.writePubkey = function (value: PublicKey) {
    const writer = this;
    writer.writeFixedArray(value.toBuffer());
  };

  proto.readPubkeyAsString = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return base58.encode(array);
  };

  proto.writePubkeyAsString = function (value: string) {
    const writer = this;
    writer.writeFixedArray(base58.decode(value));
  };
};
extendBorsh();

class Creator {
  address;
  verified;
  share;
  constructor(args: any) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

class Metadata {
  // key;
  updateAuthority;
  mint;
  data;
  primarySaleHappened;
  isMutable;
  editionNonce;
  // set lazy
  // masterEdition;
  // edition;
  constructor(args: any) {
    // this.key = MetadataKey.MetadataV1;
    this.updateAuthority = args.updateAuthority;
    this.mint = args.mint;
    this.data = args.data;
    this.primarySaleHappened = args.primarySaleHappened;
    this.isMutable = args.isMutable;
    this.editionNonce = args.editionNonce;
  }

  async init() {
    // const edition = await getEdition(this.mint);
    // this.edition = edition;
    // this.masterEdition = edition;
  }
}

class Data {
  name;
  symbol;
  uri;
  sellerFeeBasisPoints;
  creators;
  constructor(args: any) {
    this.name = args.name;
    this.symbol = args.symbol;
    this.uri = args.uri.replace(/\x00/g, "");
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
    this.creators = args.creators;
  }
}

const METADATA_SCHEMA = new Map<any, any>([
  [
    Metadata,
    {
      kind: "struct",
      fields: [
        ["key", "u8"],
        ["updateAuthority", "pubkeyAsString"],
        ["mint", "pubkeyAsString"],
        ["data", Data],
        ["primarySaleHappened", "u8"],
        ["isMutable", "u8"],
      ],
    },
  ],
  [
    Data,
    {
      kind: "struct",
      fields: [
        ["name", "string"],
        ["symbol", "string"],
        ["uri", "string"],
        ["sellerFeeBasisPoints", "u16"],
        ["creators", { kind: "option", type: [Creator] }],
      ],
    },
  ],
  [
    Creator,
    {
      kind: "struct",
      fields: [
        ["address", "pubkeyAsString"],
        ["verified", "u8"],
        ["share", "u8"],
      ],
    },
  ],
]);

const decodeMetadata = (buffer: Buffer) =>
  deserializeUnchecked(METADATA_SCHEMA, Metadata, buffer);

export default decodeMetadata;
