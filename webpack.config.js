const path = require('path');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
