const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {

  presets: [
    [
      "@babel/preset-env",
      {
        modules: isTest ? 'commonjs' : false,
        targets: {
          node: "current"
        }
      }
    ],
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
    ],
    'syntax-dynamic-import',
    'transform-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    isTest ? 'dynamic-import-node' : null
  ].filter(Boolean)

}