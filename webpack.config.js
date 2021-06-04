const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'app');
const ASSETS_DIR = path.resolve(__dirname, 'app/assets');
const DEPENDENCIES_DIR = path.resolve(__dirname, 'node_modules');
const POPUP_DIR = path.resolve(__dirname, 'app/popup');
const OPTIONS_DIR = path.resolve(__dirname, 'app/options');


module.exports = (env, argv) => ({
  devtool: 'none',
  performance: {
    hints: false,
  },
  optimization: {
    // Do not minimize function names and variables
    minimize: false,
  },
  entry: {
    background: [`${SRC_DIR}/background.js`],
    options: [`${OPTIONS_DIR}/index.jsx`],
    popup: [`${POPUP_DIR}/index.jsx`],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    filename: '[name].js',
    path: BUILD_DIR,
  },
  plugins: [
    new EnvironmentPlugin({
      DEV_MODE: argv.mode === 'development',
    }),

    // Clear './dist' folder
    new CleanWebpackPlugin({
      // Running on watch mode will cause all the other files barring the changed one to be deleted,
      // if this is set to true
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
    new OptimizeCssAssetsPlugin({}),
    new CopyPlugin([
      { from: 'manifest.json', to: 'manifest.json' },
      { from: `${ASSETS_DIR}/icons/*`, to: 'icons', flatten: true },
      { from: `${DEPENDENCIES_DIR}/webextension-polyfill/dist/browser-polyfill.js` },
      { from: `${POPUP_DIR}/index.html`, to: 'popup.html' },
      { from: `${OPTIONS_DIR}/index.html`, to: 'options.html' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [SRC_DIR, APP_DIR],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'src',
            },
          }
        ],
      },
      {
        test: /\.jsx$/,
        include: [APP_DIR],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'app',
            },
          }
        ],
      },
      {
        test: /\.css$/,
        include: [APP_DIR],
        use: [
          'style-loader', // inject CSS to page
          'css-loader', // translates CSS into CommonJS modules
          'postcss-loader', // Run postcss actions
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
    extensions: ['.js', '.jsx'],
  },
});
