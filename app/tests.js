
require('babel-core/register')({
  presets: [ 'es2015', 'stage-2'],
  // plugins: ["transform-async-to-generator"]
});
require('babel-polyfill');

require('./client/utils/tests');
