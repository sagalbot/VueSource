/**
 * @param {Array} tags
 * @return {Object|false}
 */
export default function(tags) {
  if (tags && tags.since) {
    const since = {};
    since.version = tags.since[0].description;
    since.link = `https://github.com/sagalbot/vue-select/releases/tag/v${tags.since[0].description}`;
    return since;
  }
  return false;
}
