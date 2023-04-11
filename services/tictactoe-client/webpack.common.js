/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('../../webpack.common');

module.exports = merge(common, {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../../dist/services/tictactoe-client'),
    publicPath: '/',
  },
});
