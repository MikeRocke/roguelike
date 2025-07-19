const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: [
    './src/index06_fixed.ts'
  ],
  // output: {
  //   path: __dirname + '/dist',
  //   filename: "app.bundle.js"
  // },
  resolve: {
    extensions: [".js", ".ts"],
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.(ico)$/,
        use: {
          loader: "file-loader?name=src/[name].[ext]"
        }
      }
    ]
  },
  mode: 'development',
  devServer: { static: './dist' },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index0.html',
        favicon: './src/favicon.ico'
      }
    ),
    new webpack.ProvidePlugin(
      { $: 'jquery', jquery: 'jquery' }
    )
  ]
};
