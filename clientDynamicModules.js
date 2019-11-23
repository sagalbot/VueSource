const generator = require('./node/generator');
const {green} = require('chalk');

/**
 * Dynamically generates all API documentation with vue-docgen-api.
 * The resulting object can be imported and used client-side via:
 *
 * import documentation from '@dynamic/api'
 *
 * @return {Promise<{name: string, content: string}>}
 */
async function clientDynamicModules (src) {
  const docs = await generator(src);

  console.log(green('✅ Generated API documentation for Select.vue'));

  return {
    name: 'api.js',
    content: `export default ${JSON.stringify(docs)}`,
  };
}

module.exports = clientDynamicModules;
