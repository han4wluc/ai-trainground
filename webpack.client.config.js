
var fs = require('fs');
var path = require('path');

module.exports = {

  entry: [
    'babel-polyfill',
    // 'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'app/client/app.js') // Your app's entry point
  ],
  // entry: path.resolve(__dirname, 'app/client/index.js'),

  output: {
    path: path.resolve(__dirname, 'app/server/static/'),
    publicPath: 'app/server/static/',
    filename: 'bundle.js'
  },

  // comment for server rendering
  // devServer: {
  //   contentBase: 'http://localhost:8000'
  // },

  module: {
    loaders: [{
      test: /\.js$/,// A regexp to test the require path. accepts either js or jsx
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=stage-2&presets[]=react'],
    }],
  },
};
