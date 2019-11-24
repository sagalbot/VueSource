/**
 * Get all of the component mixin paths.
 * @param directory
 * @return {string[]}
 */
function getMixins (directory) {
  return fs.readdirSync(directory)
    .filter(file => file !== 'index.js')
    .map(file => path.resolve(directory, file));
}

module.exports = getMixins;
