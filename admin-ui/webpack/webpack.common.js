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
            ["@babel/preset-env", { modules: false }],
            "@babel/preset-react"
          ],
          plugins: [
            [
              "babel-plugin-import",
              {
                libraryName: "@material-ui/core",
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: "",
                camel2DashComponentName: false
              },
              "core"
            ],
            [
              "babel-plugin-import",
              {
                libraryName: "@material-ui/icons",
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: "",
                camel2DashComponentName: false
              },
              "icons"
            ],
            [
              "@babel/transform-runtime",
              {
                regenerator: true
              }
            ]
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
      },
      {
        test: /\.(config)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Digital tilgangskort",
      template: "public/index.html",
      inject: true,
      favicon: "./public/IN-logo.svg"
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
      src: path.resolve("src"),
      "@material-ui/core": "@material-ui/core/es"
    }
  }
};
