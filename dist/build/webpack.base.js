const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./config');

module.exports = {
  entry: [
    'antd/dist/antd.css',
    'tb-icons/lib/styles/tb-icons.css',
    'babel-polyfill',
    'normalize.css',
    config.srcPath,
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: config.srcPath,
      },

      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:6].[ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    modules: [
      config.srcPath,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      Config: path.resolve(__dirname, '../src/config.js'),
      '@': path.resolve(__dirname, '../src/components/'),
      Saga: path.resolve(__dirname, '../src/models/sagas/'),
      Common: path.resolve(__dirname, '../src/components/Common/'),
      Utils: path.resolve(__dirname, '../src/utils/'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: config.templatePath,
    }),
  ],

};
