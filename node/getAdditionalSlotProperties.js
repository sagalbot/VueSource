const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const pick = require('lodash/pick');
const prettier = require('prettier');
const compiler = require('vue-template-compiler');
const Slots = require('./Slots');

const t = require('@babel/types');
const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse');

function pickBindingsFromElement ({attribs}) {
  return pick(
    attribs,
    Object.keys(attribs)
      .filter(attr => attr.indexOf(':') === 0 || attr === 'v-bind'),
  );
}

function parseDocBlock (comment) {

}

function findDocBlockForExpression (path, comments) {
  const methodLocationStart = path.node.loc.start;
  return comments.find(({loc}) => {
    return methodLocationStart.line - 1 === loc.end.line;
  }).value || '';
}

/**
 * @param {Slots} slots
 * @param content
 */
function getSlotBindingComments (slots, {content}) {
  const ast = parse(content, {sourceType: 'module'});

  /**
   * TODO:
   * - [ ] this traversal currently includes watchers, need to limit to
   *        props, methods, computed, maybe data too?
   * - [ ] attach the comments to the bindings
   */

  traverse.default(ast, {
    enter (path) {
      if (path.node.key && slots.bindings.includes(path.node.key.name)) {
        const comments = findDocBlockForExpression(path, ast.comments);
      }
    },
  });
}

/**
 * @param pathToComponent
 * @return {Object}
 */
function getAdditionalSlotProperties (pathToComponent) {
  const slots = new Slots();
  const file = fs.readFileSync(path.resolve(pathToComponent)).toString();
  const {template, script} = compiler.parseComponent(file);
  const $ = cheerio.load(template.content);

  $('slot').each(function (index, element) {
    const bindings = pickBindingsFromElement(element) || {};
    const slotName = element.attribs.name || 'default';
    const content = prettier.format($.html(element), {parser: 'html'});

    slots.add(slotName, {
      content,
      bindings,
    });
  });

  getSlotBindingComments(slots, script);

  return slots.definitions;
}

module.exports = getAdditionalSlotProperties;
