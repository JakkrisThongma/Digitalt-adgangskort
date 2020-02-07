const CompressionWebpackPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod.js');

module.exports = merge(prodConfig, {
  mode: 'none',
  plugins: [new CompressionWebpackPlugin()]
});
