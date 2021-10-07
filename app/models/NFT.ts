import { getParent, types } from "mobx-state-tree";

const NFT = types
  .model("NFT", {
    // mint: types.string,
    name: types.string,
    image: types.string,
  })
  .views((self) => ({
    get isWumbo() {
      // https://pbs.twimg.com/profile_images/1398129901702688769/3GQuUoUq_400x400.png
      // properties.creators.includes(c => c.address === "GqF9iGApreFgwdNEfXGX5exAprcAWvyiPqgSN8Gq3hE3")

      return (getParent(self, 2) as any).balance > 4 * 10 ** 9;
    },
  }));

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
