const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const pick = require('lodash/pick');
const prettier = require('prettier');
const compiler = require('vue-template-compiler');
const parseSingleFileComponent = require('./utils/parseSingleFileComponent');

const t = require('@babel/types');
const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse');

/**
 *
 * @param {string} func
 * @return {string}
 */
const removeFunctionParams = func => func.replace(/ *\([^)]*\) */g, '');

/**
 * @param {Node} element
 * @param {Object} element.attribs - <attribute>: <value>
 */
function pickBindingsFromElement ({attribs}) {
  const isBinding = attr => attr.indexOf(':') === 0 || attr === 'v-bind';
  const bindings = pick(attribs, Object.keys(attribs).filter(isBinding));

  return Object.keys(bindings).map(attr => ({
    bound: attr.replace(':', ''),
    value: attribs[attr],
  }));
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
  const slots = [];
  const {template, script, $} = parseSingleFileComponent(pathToComponent);

  $('slot').each((index, element) => slots.push({
    name: element.attribs.name || 'default',
    content: prettier.format($.html(element), {parser: 'html'}),
    bindings: pickBindingsFromElement(element) || {},
    // comments: getSlotBindingComments(slots, script),
  }));

  slots.get = (name) => slots.find(slot => slot.name === name);

  return slots;
}

module.exports = {getAdditionalSlotProperties, pickBindingsFromElement};
