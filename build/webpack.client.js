const merge = require("webpack-merge").merge;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base");
const resolve = filepath => {
  return path.resolve(__dirname, filepath);
};
module.exports = merge(base, {
  entry: {
    client: resolve("../src/client-entry.js")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("../public/index.html")
    })
  ]
});