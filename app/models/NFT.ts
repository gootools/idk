import { types } from "mobx-state-tree";

const NFT = types.model("NFT", {
  // mint: types.string,
  name: types.string,
  image: types.string,
});

export default NFT;

// interface NFT {
//   name: string;
//   symbol: string;
//   description: string;
//   seller_fee_basis_points: number;
//   external_url: string;
//   image: string;
//   attributes: {
//     trait_type: string;
//     value: string;
//   }[];
//   collection: {
//     name: string;
//     family: string;
//   };
//   properties: {
//     category: string;
//     files: {
//       uri: string;
//       type: string;
//     }[];
//     creators: {
//       address: string;
//       share: number;
//     }[];
//   };
// }
