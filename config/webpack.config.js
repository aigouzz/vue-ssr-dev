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
    devServer: {
        open: true,
        post: 8080,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1',
                pathRewrite: {
                    '/api': ''
                },
                changeOrigin: true
            }
        },
    },
    mode: 'development',
    node: {
        fs: 'empty'
    }
  });