const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');

const BUILD_DIR = path.join(__dirname, '../dist');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    open: true,
    hot: true
  }
});
