const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

const BUILD_DIR = path.join(__dirname, "../dist");
const APP_BUNDEL = path.join(__dirname, "../src", "index");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const { version } = require("../package.json");

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  entry: {
    bundle: APP_BUNDEL
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(config)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Digital Access Card",
      template: "public/index.html",
      inject: true,
      favicon: path.resolve(__dirname, "../public/IN-logo.svg")
    }),
    gitRevisionPlugin,
    new DefinePlugin({
      BUILDINFO: JSON.stringify({
        revision: gitRevisionPlugin.commithash(),
        version,
        buildTime: Date.now()
      })
    })
  ],
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      validation: path.resolve(__dirname, "../src/helpers/validation"),
      "@": path.resolve(__dirname, "../src")
      // enable next feature will minimize bundle size further, but it meant for advanced use cases,
      // and might not work if agent lacks some experiential features from ECMAScript
      // https://material-ui.com/guides/minimizing-bundle-size/#ecmascript
      // "@material-ui/core": "@material-ui/core/es"
    }
  }
};
