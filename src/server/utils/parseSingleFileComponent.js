const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const compiler = require('vue-template-compiler');

function parseComponent (pathToComponent) {
  const file = fs.readFileSync(path.resolve(pathToComponent)).toString();
  const compiled = compiler.parseComponent(file);
  return {...compiled, $: cheerio.load(compiled.template.content)};
}

module.exports = parseComponent;
