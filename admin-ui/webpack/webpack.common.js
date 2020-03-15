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
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: "> 1%, not ie 11, not op_mini all"
                }
              }
            ],
            "@babel/preset-react"
          ]
        }
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Digital tilgangskort",
      template: "public/index.html",
      inject: true
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
      validation: path.resolve(__dirname, "../src/helpers/validation")
    }
  }
};
