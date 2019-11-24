import Markdown from 'markdown-it';
const md = new Markdown();

/**
 * @param {String} text
 * @return {*}
 */
export default text => md.render(text);
