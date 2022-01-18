const path = require('path');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    main: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
  },
};
