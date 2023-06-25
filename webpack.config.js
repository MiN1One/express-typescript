const path = require('path');
const { default: TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (_, argv) => ({
  entry: './src/server.ts',
  mode: argv.mode,
  stats: 'minimal',
  devtool: 'eval-source-map',
  output: {
    publicPath: './',
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: argv.mode === 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
      })
    ] 
  },
  plugins: [
    new NodemonPlugin({
      watch: path.resolve(__dirname, './dist'),
      env: { NODE_ENV: argv.mode }
    }),
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
    new webpack.DefinePlugin({
      'process.env': argv.mode
    }),
    new TypescriptDeclarationPlugin()
  ]
});