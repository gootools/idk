module.exports = {
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
    extraNodeModules: {
      buffer: require.resolve("buffer").Buffer,
      crypto: require.resolve("isomorphic-webcrypto"),
      stream: require.resolve("readable-stream"),
    },
  },
};
