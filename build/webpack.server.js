const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base");
const resolve = filepath => {
  return path.resolve(__dirname, filepath);
};
module.exports = merge(base, {
  entry: {
    server: resolve("../src/server-entry.js")
  },
  target: "node",
  output: {
    libraryTarget: "commonjs2" // 导出供服务端渲染来使用
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.ssr.html",
      template: resolve("../public/index.ssr.html"),
      files: {
        js: 'client.bundle.js'
      },
      excludeChunks: ["server"]
    })
  ]
});