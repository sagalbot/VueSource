const path = require('path');

const VueSource = [
  require(path.resolve(__dirname, '../../src/server/index.js')),
  {src: path.resolve(__dirname, '../../tests/mocks/MockComponent.vue')},
];

console.log(VueSource);

module.exports = {
  plugins: [VueSource],

  themeConfig: {
    sidebar: [
      {
        title: 'API',
        collapsable: false,
        children: [
          ['api/props', 'Props'],
          ['api/events', 'Events'],
          ['api/slots', 'Slots'],
          ['api/methods', 'Methods'],
        ],
      },
    ],
  },
};
