const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
	'aes-cbc': path.join(__dirname, '/examples/js/aes-cbc.js'),
	'aes-cbc-2': path.join(__dirname, '/examples/js/aes-cbc-2.js'),
	'ecdh': path.join(__dirname, '/examples/js/ecdh.js'),
	'ecdsa': path.join(__dirname, '/examples/js/ecdsa.js'),
	'rsa-oaep': path.join(__dirname, '/examples/js/rsa-oaep.js'),
	'sha1': path.join(__dirname, '/examples/js/sha1.js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist/browser']),
    new webpack.DefinePlugin({
      IS_BROWSER: true
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist/browser'),
    filename: '[name].js'
  },
  target: 'web',
};
