const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');
const webpack = require('webpack');

module.exports = merge(base, {
    entry: {
      client: path.resolve(__dirname, '../src/entry-client.js')
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    mode: 'development',
  });