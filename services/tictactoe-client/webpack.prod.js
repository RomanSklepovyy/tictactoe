/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
});
