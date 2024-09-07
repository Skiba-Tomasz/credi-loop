const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
