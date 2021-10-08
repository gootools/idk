module.exports = {
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
    extraNodeModules: {
      buffer: require.resolve("buffer").Buffer,
      stream: require.resolve("readable-stream"),
    },
  },
};
