/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
require('dotenv').config({ path: '../../.env' });
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: process.env.TICTACTOE_CLIENT_PORT || 80,
    hot: true,
  },
  plugins: [new webpack.EnvironmentPlugin(['TICTACTOE_CLIENT_PORT'])],
});
