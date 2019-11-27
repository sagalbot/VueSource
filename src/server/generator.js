const bt = require('@babel/types');
const docs = require('vue-docgen-api');
const {NodePath} = require('ast-types');
const {Documentation, ParseOptions, ComponentDoc} = require('vue-docgen-api');
const {getAdditionalSlotProperties} = require('./getAdditionalSlotProperties');

/**
 * Generate an object of API documentation.
 * @param {String} src absolute path to the component being documented
 * @return {Promise<ComponentDoc>}
 */
module.exports = async (src) => {

  const documentation = await docs.parse(src, {
    jsx: false,
    addScriptHandlers: [
      /**
       * @param {Documentation} docs
       * @param {NodePath} path
       * @param {bt.File} astPath
       * @param {ParseOptions} options
       * @return {Promise<void>}
       */
      function (docs, path, astPath, options) {

      },
    ],
    addTemplateHandlers: [
      /**
       * @param {Documentation} docs
       * @param {ASTElement} templateAst
       * @param {TemplateParserOptions} options
       */
      function (docs, templateAst, options) {
      },
    ],
  });

  documentation.slots = getAdditionalSlotProperties(src);

  return documentation;
};
