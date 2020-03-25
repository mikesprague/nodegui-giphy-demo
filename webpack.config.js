const path = require('path');
const { DefinePlugin } = require('webpack');
require('dotenv').config();

module.exports = {
  mode: process.NODE_ENV || 'development',
  entry: './src',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new DefinePlugin({
      GIPHY_API_KEY: JSON.stringify(process.env.GIPHY_API_KEY)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: 'native-addon-loader',
            options: {
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
