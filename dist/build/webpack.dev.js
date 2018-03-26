const webpack = require('webpack');
// const path = require('path');
const baseConfig = require('./webpack.base');

const config = require('./config');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    'react-hot-loader/patch',
    ...baseConfig.entry,
  ],

  output: {
    path: config.distPath,
    publicPath: '/',
    filename: 'js/app.js',
  },

  module: {
    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              module: true,
              camelCase: true,
              localIdentName: '[name]__[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.css$/,
        exclude: [/src/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    // contentBase: ['/', 'public', 'node_modules'],
    historyApiFallback: true,
    // host: '192.168.3.218',
    host: '127.0.0.1',
    port: '8080',
    stats: {
      assets: false,
      chunks: false,
      hash: false,
      version: false,
    },
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    ...baseConfig.plugins,
  ],
});
