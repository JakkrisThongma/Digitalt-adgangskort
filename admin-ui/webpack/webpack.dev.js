const merge = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

const BUILD_DIR = path.join(__dirname, "../dist");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    // open: "Google Chrome", // use for Chrome on MAC
    open: "chrome", // use for Chrome on windows
    hot: true,
    historyApiFallback: true
  }
});
