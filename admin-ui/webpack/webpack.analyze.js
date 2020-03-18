const merge = require("webpack-merge");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const prodConfig = require("./webpack.prod.js");

module.exports = merge(prodConfig, {
  mode: "none",
  plugins: [new WebpackBundleAnalyzer()]
});
