import { highlight, languages } from 'prismjs';

/**
 * Returns code block with prism markup.
 * @param {String} snippet
 * @param {String} language
 * @return {*}
 */
export default (snippet, language = 'javascript') => {
  return highlight(snippet, languages[language], language);
}
