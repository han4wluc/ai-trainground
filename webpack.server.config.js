
var fs = require('fs');
var path = require('path');

module.exports = {

  entry: path.resolve(__dirname, 'app/server/index.js'),

  output: {
    filename: './build/server.bundle.js'
  },

  target: 'node',

  //keep nod_module paths ouf of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [{
      test: /\.js$/,// A regexp to test the require path. accepts either js or jsx
      exclude: /node_modules/,
      loaders: ['babel?presets[]=es2015&presets[]=stage-2&presets[]=react'],

    }],
  }
};
