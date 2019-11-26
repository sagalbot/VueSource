const path = require('path');

module.exports = {
  plugins: [
    [
      require(path.resolve(__dirname, '../../src/index.js')),
      {src: path.resolve(__dirname, '../../tests/mocks/MockComponent.vue')},
    ],
  ],
};
