
require('babel-core/register')({
  presets: [ 'es2015', 'stage-2', 'react'],
  // plugins: ["transform-async-to-generator"]
});
require('babel-polyfill');

// require('./client/comps/tests');

// require('./client/utils/tests');
// require('./client/modules/nine/utils/tests');
// require('./client/modules/ttt/utils/tests');
// require('./client/modules/border/utils/tests');
require('./client/modules/nn/utils/tests');
