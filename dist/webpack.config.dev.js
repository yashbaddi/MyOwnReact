"use strict";

var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {
            modules: "commonjs"
          }]],
          configFile: path.resolve(__dirname, ".babelrc")
        }
      }
    }]
  },
  devServer: {
    "static": path.resolve(__dirname, "dist"),
    port: 3000
  }
};