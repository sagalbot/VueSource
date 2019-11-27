/**
 * @param {Array} tags
 * @return {[]}
 */
export default function (tags) {
  const since = [];
  if (tags.hasOwnProperty('see')) {
    tags.see.forEach(({description}) => since.push(description));
  }
  return since;
};
