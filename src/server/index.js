const path = require('path');
const {extendPageData} = require('./extendPageData');
const clientDynamicModules = require('../client/clientDynamicModules');

/**
 * @param src Absolute path to the file of the component being documented
 * @return {{enhanceAppFiles: *, name: string, clientDynamicModules: (function(): {name: string, content: string}), extendPageData: *}}
 */
module.exports = ({src}) => {
  if (typeof src === 'undefined') {
    throw new Error('VueSource: you must define a src.');
  }

  return {
    name: '@vuesource/vuepress',

    /**
     * Generates API documentation for use on the client side.
     *
     * @see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
     * @return {Promise<{name: string, content: string}>}
     */
    clientDynamicModules: async () => await clientDynamicModules(src),

    /**
     * @see https://vuepress.vuejs.org/plugin/option-api.html#enhanceappfiles
     */
    enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),

    /**
     * This function is responsible for adding documentation headers
     * to the `headers Array` of each API page. These headers are
     * then picked up by the search API, and displayed in the sidebar.
     *
     * @see https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
     */
    extendPageData: async (page) => await extendPageData(page, src),
  };
};
